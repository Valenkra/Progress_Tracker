// ============================================================
//  CRUD EXÁMENES
// ============================================================
async function addExam(exam) {
    if (currentUser && sb) {
        const { data, error } = await sb.from('exams')
            .insert([{ ...exam, user_id: currentUser.id }])
            .select()
            .single();

        if (!error && data) {
            exams.push(data);
            exams.sort((a, b) => new Date(a.date) - new Date(b.date));
            saveExamsLocal();
            renderCountDowns();
            showSaved(true);
            return;
        }
    }

    // fallback local
    exams.push({ id: 'local_' + Date.now(), ...exam });
    exams.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveExamsLocal();
    renderCountDowns();
    showSaved(false);
}

async function deleteExam(id) {
    exams = exams.filter(e => String(e.id) !== String(id));
    saveExamsLocal();
    if (currentUser && sb) {
        await sb.from('exams').delete().eq('id', id).eq('user_id', currentUser.id);
        showSaved(true);
    } else { showSaved(false); }
}

// ============================================================
//  COUNTDOWNS – RENDER Y TICK
// ============================================================
function renderCountDowns() {
    const left  = document.getElementById('countdowns-left');
    const right = document.getElementById('countdowns-right');
    left.innerHTML = right.innerHTML = '';

    if (!exams.length) { left.innerHTML = `<p class="no-exams">No hay parciales</p>`; return; }

    exams.forEach((exam, i) => {
        const box = document.createElement('div');
        box.className = 'countdown-box';
        box.innerHTML = `
            <div class="countdown-header">
                <span class="countdown-title">${exam.title}</span>
                <button class="delete-countdown" data-id="${exam.id}">×</button>
            </div>
            <div class="countdown-time" data-id="${exam.id}">
                <span class="days">00</span>d
                <span class="hours">00</span>h
                <span class="minutes">00</span>m
            </div>`;
        (i < 2 ? left : right).appendChild(box);
    });
}

function startCountDowns() {
    setInterval(() => {
        document.querySelectorAll('.countdown-time').forEach(box => {
            const exam = exams.find(e => String(e.id) === box.dataset.id);
            if (!exam) return;
            const diff = new Date(exam.date).getTime() - Date.now();
            if (diff < 0) { box.innerHTML = `<span style="color:#ef4444">¡Ya pasó!</span>`; return; }
            box.querySelector('.days').textContent    = String(Math.floor(diff / 86400000)).padStart(2,'0');
            box.querySelector('.hours').textContent   = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
            box.querySelector('.minutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
        });
    }, 1000);
}
