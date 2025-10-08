// Validación para el formulario de registro

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formRegistro');
  if (form) {
    form.addEventListener('submit', function(e) {
      const correo = document.getElementById('correo').value.trim();
      const password = document.getElementById('password').value;
      const confirmarPassword = document.getElementById('confirmar-password').value;
      let error = '';

      // Validar correo
      const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!correoRegex.test(correo)) {
        error += 'El correo no es válido.\n';
      }

      // Validar contraseña
      if (password.length < 6) {
        error += 'La contraseña debe tener al menos 6 caracteres.\n';
      }

      // Confirmar contraseña
      if (password !== confirmarPassword) {
        error += 'Las contraseñas no coinciden.\n';
      }

      if (error) {
        alert(error);
        e.preventDefault();
      }
    });
  }
});