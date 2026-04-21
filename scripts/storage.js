// ============================================================
//  LOCAL STORAGE
// ============================================================
function loadLocal() {
    guides = JSON.parse(localStorage.getItem(GUIDES_KEY) || '[]');
    exams  = JSON.parse(localStorage.getItem(EXAMS_KEY)  || '[]');
}
function saveGuidesLocal() { localStorage.setItem(GUIDES_KEY, JSON.stringify(guides)); }
function saveExamsLocal()  { localStorage.setItem(EXAMS_KEY,  JSON.stringify(exams));  }

// ============================================================
//  SAVE INDICATOR
// ============================================================
function showSaved(cloud = false) {
    const el = document.getElementById('save-indicator');
    el.textContent = cloud ? '☁️ Sincronizado' : '✓ Guardado localmente';
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 2200);
}
