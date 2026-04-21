// ============================================================
//  ACCOUNT AREA
// ============================================================
function renderAccountArea() {
    const area = document.getElementById('account-area');
    if (currentUser) {
        const initial = currentUser.email[0].toUpperCase();
        area.innerHTML = `
            <div class="user-pill">
                <div class="user-avatar">${initial}</div>
                <span>${currentUser.email}</span>
                <button class="logout-btn" onclick="handleLogout()">Desconectar</button>
            </div>`;
    } else {
        area.innerHTML = `
            <button class="sync-btn" onclick="openAuthModal()">
                ☁️ Conectar cuenta
            </button>`;
    }
}

// ============================================================
//  AUTH MODAL
// ============================================================
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('open');
}
function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('open');
    document.getElementById('auth-error').style.display   = 'none';
    document.getElementById('auth-success').style.display = 'none';
}
function switchTab(tab) {
    currentAuthTab = tab;
    document.getElementById('tab-login').classList.toggle('active',    tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('auth-submit-btn').textContent =
        tab === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
    document.getElementById('auth-error').style.display   = 'none';
    document.getElementById('auth-success').style.display = 'none';
}
function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg; el.style.display = 'block';
    document.getElementById('auth-success').style.display = 'none';
}
function showAuthSuccess(msg) {
    const el = document.getElementById('auth-success');
    el.textContent = msg; el.style.display = 'block';
    document.getElementById('auth-error').style.display = 'none';
}

async function handleAuth() {
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const btn      = document.getElementById('auth-submit-btn');

    if (!email || !password) { showAuthError('Completá todos los campos.'); return; }
    if (password.length < 6) { showAuthError('La contraseña debe tener al menos 6 caracteres.'); return; }

    btn.disabled = true; btn.textContent = 'Cargando...';

    try {
        const client = await loadSupabaseSDK();

        if (currentAuthTab === 'login') {
            const { data, error } = await client.auth.signInWithPassword({ email, password });
            if (error) throw error;
            currentUser = { email: data.user.email, id: data.user.id };
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
            closeAuthModal();
            await syncToCloud();
            subscribeToRealtime();
        } else {
            const { error } = await client.auth.signUp({ email, password });
            if (error) throw error;
            showAuthSuccess('¡Cuenta creada! Revisá tu email para confirmar y luego iniciá sesión.');
            btn.disabled = false; btn.textContent = 'Crear cuenta';
            return;
        }
    } catch (err) {
        const msgs = {
            'Invalid login credentials': 'Email o contraseña incorrectos.',
            'Email not confirmed':        'Confirmá tu email antes de iniciar sesión.',
            'User already registered':    'Ese email ya está registrado.',
        };
        showAuthError(msgs[err.message] || err.message);
        btn.disabled = false;
        btn.textContent = currentAuthTab === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
    }
}

// ============================================================
//  AUTH EVENT LISTENERS
// ============================================================
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuthModal(); });
document.getElementById('auth-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleAuth();
});
