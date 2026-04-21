// ============================================================
//  CRUD GUÍAS — siempre local primero, nube si está conectado
// ============================================================
async function addGuide(guide) {
    if (currentUser && sb) {
        const { data, error } = await sb.from('guides')
            .insert([{ ...guide, user_id: currentUser.id }])
            .select()
            .single();

        if (!error && data) {
            guides.unshift(data);
            saveGuidesLocal();
            renderGuides();
            showSaved(true);
            return;
        }
    }

    // fallback local
    guides.unshift({ id: Date.now(), ...guide });
    saveGuidesLocal();
    renderGuides();
    showSaved(false);
}

async function updateGuide(id, changes) {
    const idx = guides.findIndex(g => String(g.id) === String(id));
    if (idx !== -1) Object.assign(guides[idx], changes);
    saveGuidesLocal();
    if (currentUser && sb) {
        await sb.from('guides').update(changes).eq('id', id).eq('user_id', currentUser.id);
        showSaved(true);
    } else { showSaved(false); }
}

async function deleteGuide(id) {
    guides = guides.filter(g => String(g.id) !== String(id));
    saveGuidesLocal();
    if (currentUser && sb) {
        await sb.from('guides').delete().eq('id', id).eq('user_id', currentUser.id);
        showSaved(true);
    } else { showSaved(false); }
}

// ============================================================
//  GUÍAS – RENDER
// ============================================================
function calculateProgress(c, t) { return t > 0 ? Math.min(Math.floor((c / t) * 100), 100) : 0; }
function getUniqueMaterias()      { return [...new Set(guides.map(g => g.materia))].sort(); }

function renderFilters() {
    const container = document.getElementById('materia-filters');
    container.innerHTML = '';
    getUniqueMaterias().forEach(materia => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn'; btn.textContent = materia; btn.dataset.filter = materia;
        btn.addEventListener('click', () => { currentFilter = materia; updateActiveFilter(); renderGuides(); });
        container.appendChild(btn);
    });
}

function updateActiveFilter() {
    document.querySelectorAll('.filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === currentFilter));
}

function renderGuides() {
    const container = document.getElementById('guides-container');
    const empty     = document.getElementById('empty-state');
    container.innerHTML = '';

    const filtered = currentFilter === 'all' ? guides : guides.filter(g => g.materia === currentFilter);
    if (!filtered.length) { empty.style.display = 'flex'; renderTotalProgress(); return; }
    empty.style.display = 'none';

    filtered.forEach(guide => {
        const progress = calculateProgress(guide.current, guide.total);
        container.innerHTML += `
            <div class="card" data-id="${guide.id}">
                <div class="card-header">
                    <div>
                        <span class="materia-tag">${guide.materia}</span>
                        <h3 class="guide-name">${guide.name}</h3>
                    </div>
                    <button class="delete-btn" data-id="${guide.id}">🗑️</button>
                </div>
                <div class="progress-info">
                    <span class="exercise-counter">Ejercicio <strong>${guide.current}</strong> de <strong>${guide.total}</strong></span>
                    <span class="percentage">${progress}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width:${progress}%"></div>
                </div>
                <div class="edit-section">
                    <div class="input-group"><label>Total</label><input type="number" class="total-input" value="${guide.total}" data-id="${guide.id}"></div>
                    <div class="input-group"><label>Actual</label><input type="number" class="current-input" value="${guide.current}" data-id="${guide.id}"></div>
                    <button class="update-btn" data-id="${guide.id}">Actualizar</button>
                </div>
            </div>`;
    });

    addCardListeners();
    renderTotalProgress();
}

function renderTotalProgress() {
    const card = document.getElementById('total-progress-card');
    if (!guides.length) { card.style.display = 'none'; return; }
    const totalEx = guides.reduce((s, g) => s + g.total, 0);
    const doneEx  = guides.reduce((s, g) => s + g.current, 0);
    const pct = totalEx > 0 ? Math.min(Math.round((doneEx / totalEx) * 100), 100) : 0;
    card.style.display = 'block';
    document.getElementById('total-progress-pct').textContent = pct + '%';
    document.getElementById('total-progress-bar').style.width = pct + '%';
    document.getElementById('total-progress-sub').textContent =
        doneEx + ' de ' + totalEx + ' ejercicios completados en ' + guides.length + ' guía' + (guides.length !== 1 ? 's' : '');
}

function addCardListeners() {
    document.querySelectorAll('.update-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id      = btn.dataset.id;
            const total   = parseInt(document.querySelector(`.total-input[data-id="${id}"]`).value)   || 1;
            const current = Math.min(parseInt(document.querySelector(`.current-input[data-id="${id}"]`).value) || 0, total);
            await updateGuide(id, { total, current });
            renderGuides(); renderFilters();
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('¿Eliminar guía?')) { await deleteGuide(btn.dataset.id); renderGuides(); renderFilters(); }
        });
    });
}
