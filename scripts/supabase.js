// ============================================================
//  SUPABASE – carga lazy (solo cuando el usuario lo pide)
// ============================================================
function getSB() { return sb; }

async function loadSupabaseSDK() {
    if (sb) return sb;
    if (!document.getElementById('supabase-sdk')) {
        await new Promise((res, rej) => {
            const s = document.createElement('script');
            s.id = 'supabase-sdk';
            s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
        });
    }
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return sb;
}

// ============================================================
//  SYNC: localStorage → Supabase
//  Sube lo que solo existe localmente, luego descarga todo.
// ============================================================
async function syncToCloud() {
    const overlay  = document.getElementById('sync-overlay');
    const statusEl = document.getElementById('sync-status-text');
    overlay.classList.add('open');

    try {
        // --- GUÍAS ---
        statusEl.textContent = 'Sincronizando guías...';
        const { data: cloudGuides } = await sb
            .from('guides')
            .select('id')
            .eq('user_id', currentUser.id);
        const cloudIds = new Set((cloudGuides || []).map(g => String(g.id)));

        const { data: finalGuides } = await sb.from('guides')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        guides = finalGuides || [];
        saveGuidesLocal();

        // --- EXÁMENES ---
        statusEl.textContent = 'Sincronizando parciales...';

        const { data: finalExams } = await sb
            .from('exams')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('date', { ascending: true });
        exams = finalExams || [];
        saveExamsLocal();

    } catch (err) {
        console.error('Error de sincronización:', err);
    }

    overlay.classList.remove('open');
    renderAccountArea();
    renderGuides();
    renderFilters();
    renderCountDowns();
    showSaved(true);
}

async function handleLogout() {
    if (sb) await sb.auth.signOut();
    currentUser = null;
    localStorage.removeItem(USER_KEY);
    renderAccountArea();
}

// ============================================================
//  REALTIME
// ============================================================
function subscribeToRealtime() {
    if (!sb || !currentUser) return;

    if (sb) {
        sb.removeAllChannels();
    }

    // GUÍAS
    sb.channel('guides-changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'guides',
            filter: `user_id=eq.${currentUser.id}`
        }, payload => {
            console.log('Cambio en guides:', payload);
            handleRealtimeGuide(payload);
        })
        .subscribe();

    // EXÁMENES
    sb.channel('exams-changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'exams',
            filter: `user_id=eq.${currentUser.id}`
        }, payload => {
            console.log('Cambio en exams:', payload);
            handleRealtimeExam(payload);
        })
        .subscribe();
}

function handleRealtimeGuide(payload) {
    const { eventType, new: newData, old } = payload;

    if (eventType === 'INSERT') {
        if (!guides.find(g => g.id === newData.id)) {
            guides.unshift(newData);
        }
    }
    if (eventType === 'UPDATE') {
        const idx = guides.findIndex(g => g.id === newData.id);
        if (idx !== -1) guides[idx] = newData;
    }
    if (eventType === 'DELETE') {
        guides = guides.filter(g => g.id !== old.id);
    }

    saveGuidesLocal();
    renderGuides();
}

function handleRealtimeExam(payload) {
    const { eventType, new: newData, old } = payload;

    if (eventType === 'INSERT') {
        if (!exams.find(e => e.id === newData.id)) {
            exams.push(newData);
        }
    }
    if (eventType === 'UPDATE') {
        const idx = exams.findIndex(e => e.id === newData.id);
        if (idx !== -1) exams[idx] = newData;
    }
    if (eventType === 'DELETE') {
        exams = exams.filter(e => e.id !== old.id);
    }

    exams.sort((a, b) => new Date(a.date) - new Date(b.date));

    saveExamsLocal();
    renderCountDowns();
}
