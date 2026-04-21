// ============================================================
//  EVENT LISTENERS GLOBALES
// ============================================================
document.getElementById('filter-all').addEventListener('click', () => {
    currentFilter = 'all'; updateActiveFilter(); renderGuides();
});

document.getElementById('add-countdown-btn').addEventListener('click', () => {
    document.getElementById('exam-modal').style.display = 'flex';
});

document.getElementById('exam-form').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('exam-subject').value.trim();
    const date  = document.getElementById('exam-date').value;
    if (title && date) {
        await addExam({ title, date });
        renderCountDowns();
        document.getElementById('exam-modal').style.display = 'none';
        document.getElementById('exam-form').reset();
    }
});

document.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-countdown')) {
        if (confirm('¿Eliminar este parcial?')) { await deleteExam(e.target.dataset.id); renderCountDowns(); }
    }
});

const modal = document.getElementById('modal');
document.getElementById('add-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Nueva Guía';
    document.getElementById('guide-form').reset();
    modal.style.display = 'flex';
});
document.getElementById('cancel-btn').addEventListener('click', () => { modal.style.display = 'none'; });
document.getElementById('cancel-exam-btn').addEventListener('click', () => {
    document.getElementById('exam-modal').style.display = 'none';
});
document.getElementById('guide-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('guide-name').value.trim();
    const materia = document.getElementById('materia').value.trim();
    const total   = parseInt(document.getElementById('total-exercises').value) || 1;
    const current = Math.min(parseInt(document.getElementById('current-exercise').value) || 0, total);
    await addGuide({ name, materia, total, current });
    renderGuides(); renderFilters();
    modal.style.display = 'none';
});
window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
    if (e.target === document.getElementById('exam-modal'))  document.getElementById('exam-modal').style.display = 'none';
    if (e.target === document.getElementById('auth-modal'))  closeAuthModal();
});

document.getElementById('refresh-btn').addEventListener('click', async () => {
    if (currentUser && sb) {
        await syncToCloud();
    }
    location.reload();
});

// ============================================================
//  INIT — 100% síncrono, sin esperar ninguna red
// ============================================================
(async function init() {
    loadLocal();                // lee localStorage al instante

    // Restaurar sesión guardada sin llamar a Supabase
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        await loadSupabaseSDK();
        await syncToCloud();
        subscribeToRealtime();
        // Verificar que el token siga vigente EN SEGUNDO PLANO (no bloquea la UI)
        setTimeout(async () => {
            try {
                const client = await loadSupabaseSDK();
                const { data: { session } } = await client.auth.getSession();
                if (!session) {
                    currentUser = null;
                    localStorage.removeItem(USER_KEY);
                    renderAccountArea();
                }
            } catch { /* silencioso */ }
        }, 0);
    }

    renderAccountArea();
    renderGuides();
    renderFilters();
    renderCountDowns();
    startCountDowns();
    fetchQuote();
    document.getElementById('quote-refresh-btn').addEventListener('click', fetchQuote);
})();
