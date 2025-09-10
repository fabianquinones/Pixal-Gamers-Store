(function init(){
    const form = document.getElementById('formContacto');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');

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
        const v = correoInput.value.trim();
        const rx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(!rx.test(v)){
            setError(correoInput,'Correo inválido. Debe ser formato usuario@dominio.tld'); 
            return false;
        }               
        setOK(correoInput); 
        return true;
    }

    function validarMensaje(){
        const mensaje = mensajeInput.value.trim();
        if(mensaje.length === 0){
            setError(mensajeInput, 'El mensaje no puede estar vacío'); 
            return false;
        }
        if(mensaje.length < 10){
            setError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres'); 
            return false;
        }   
        setOK(mensajeInput); 
        return true;
    }

    // eventos en tiempo real
    nombreInput.addEventListener('input', validarNombre);
    correoInput.addEventListener('input', validarCorreo);
    mensajeInput.addEventListener('input', validarMensaje);

    // evento del envio del formulario
    form.addEventListener('submit', function(e){
        e.preventDefault(); // Prevenir el envío por defecto
        
        const ok = validarNombre() && validarCorreo() && validarMensaje();
        
        if(!ok){
            form.reportValidity();
            return;
        }

        // Si todo es válido: simular envío del mensaje
        try {
            // Crear objeto con los datos del contacto
            const contacto = {
                nombre: nombreInput.value.trim(),
                correo: correoInput.value.trim().toLowerCase(),
                mensaje: mensajeInput.value.trim(),
                fecha: new Date().toLocaleString('es-CL')
            };
            
            // Simular guardado (en una aplicación real se enviaría a un servidor)
            const key = "pgs_contactos";
            const contactos = JSON.parse(localStorage.getItem(key) || "[]");
            contactos.push(contacto);
            localStorage.setItem(key, JSON.stringify(contactos));
            
            // Mensaje de éxito
            alert('¡Mensaje enviado exitosamente! 📧\nTe responderemos pronto a tu correo electrónico.');
            
            // Limpiar el formulario
            form.reset();
            
            // Limpiar validaciones
            setOK(nombreInput);
            setOK(correoInput);
            setOK(mensajeInput);
            
        } catch (error) {
            // Mensaje de error
            alert('❌ Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
            console.error('Error:', error);
        }
    });

}());
