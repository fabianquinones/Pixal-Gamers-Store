(function init(){
    const form = document.getElementById('formRegistro');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmar-password');
    const telefonoInput = document.getElementById('telefono');

    // mensaje para verificar errores usando setCustomValidity
    function setOK(el){
        el.setCustomValidity('');
    }
    
    function setError(el, msg){
        el.setCustomValidity(msg);
    }

    function validarNombre(){                                        
        const nombre = nombreInput.value.trim();
        // Solo letras y espacios, mínimo 4 caracteres
        const rx = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        if(nombre.length < 4 || !rx.test(nombre)){
            setError(nombreInput, 'El nombre debe tener solo letras y mínimo 4 caracteres'); 
            return false;
        }   
        setOK(nombreInput); 
        return true;
    }

    function validarCorreo(){
        const v = emailInput.value.trim();
        const rx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(!rx.test(v)){
            setError(emailInput,'Correo inválido. Debe ser formato usuario@dominio.tld'); 
            return false;
        }               
        setOK(emailInput); 
        return true;
    }

    function validarPassword(){
        const pass = passwordInput.value;
        if(pass.length < 7){
            setError(passwordInput, 'La contraseña debe tener al menos 7 caracteres'); 
            return false;
        }   
        setOK(passwordInput); 
        return true;
    }

    function confirmarContraseña(){
        const confirmPass = confirmPasswordInput.value;
        if(confirmPass.length < 7){
            setError(confirmPasswordInput, 'Debe repetir la contraseña (mínimo 7 caracteres)');
            return false;
        }
        if(confirmPass !== passwordInput.value){
            setError(confirmPasswordInput, 'Las contraseñas no coinciden'); 
            return false;
        }
        setOK(confirmPasswordInput); 
        return true;
    }

    function validarTelefono(){
        const tel = telefonoInput.value.trim();
        const digits = tel.replace(/\D+/g, "");
        // Validación teléfono chileno: 569XXXXXXXX o 9XXXXXXXX
        const valido = (digits.startsWith("56") && digits.length === 11 && digits[2] === "9") ||
                      (digits.length === 9 && digits[0] === "9");
        if(!valido){
            setError(telefonoInput, 'Teléfono chileno inválido. Ej: +56 9 1234 5678 o 9XXXXXXXX');
            return false;
        }
        setOK(telefonoInput);
        return true;
    }

    // Hash de contraseña para localStorage
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

    // eventos en tiempo real
    nombreInput.addEventListener('input', validarNombre);
    emailInput.addEventListener('input', validarCorreo);
    passwordInput.addEventListener('input', () => { validarPassword(); confirmarContraseña(); });
    confirmPasswordInput.addEventListener('input', confirmarContraseña);
    telefonoInput.addEventListener('input', validarTelefono);

    // evento del envio del formulario
    form.addEventListener('submit', async function(e){
        const ok = validarNombre() && validarCorreo() && validarPassword() && 
                  confirmarContraseña() && validarTelefono();
        
        if(!ok){
            e.preventDefault();
            form.reportValidity();
            return;
        }

        // Si todo es válido: guardar en localStorage
        const user = {
            correo: emailInput.value.trim().toLowerCase(),
            passHash: await generarHashTexto(passwordInput.value)
        };
        
        try {
            const key = "pgs_users";
            const list = JSON.parse(localStorage.getItem(key) || "[]");
            const idx = list.findIndex(u => u.correo === user.correo);
            if (idx >= 0) list[idx] = user; else list.push(user);
            localStorage.setItem(key, JSON.stringify(list));
            
            // Mensaje de éxito
            alert('¡Registro exitoso! Bienvenido a Pixal & Gamers Store 🎮');
            
            // Redirigir al login
            window.location.href = 'login.html';
        } catch {
            alert('Error al guardar el registro. Inténtalo nuevamente.');
        }
    });


    

}());