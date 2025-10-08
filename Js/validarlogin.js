(function init(){
    const form = document.getElementById('formLogin');
    const emailInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');

    // Hash de contraseña
    async function generarHashTexto(text) {
        try {
            const enc = new TextEncoder().encode(String(text));
            const buf = await crypto.subtle.digest("SHA-256", enc);
            const bytes = Array.from(new Uint8Array(buf));
            return btoa(String.fromCharCode.apply(null, bytes));
        } catch {
            return btoa(unescape(encodeURIComponent(String(text))));
        }
    }
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        
        if (!email || !password) {
            alert('Completa todos los campos');
            return;
        }
        
        // Buscar en localStorage
        const users = JSON.parse(localStorage.getItem("pgs_users") || "[]");
        const user = users.find(u => u.correo === email);
        
        if (!user) {
            alert('Correo no registrado');
            return;
        }
        
        const passHash = await generarHashTexto(password);
        
        if (user.passHash === passHash) {
            alert('¡Login exitoso!');
            window.location.href = 'index.html';
        } else {
            alert('Contraseña incorrecta');
            passwordInput.value = '';
        }
    });
})();