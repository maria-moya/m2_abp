$(function(){

    $('#loginForm').on('submit',function(event){
        event.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        let validacion = true;

        $('#email, #password').removeClass('is-valid is-invalid');
        $('#inicioSesion').addClass('d-none');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //VALIDAR EMAIL
        if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            validacion = false;
        } else {
            $('#email').addClass('is-valid');
        }

        //VALIDAR CONTRASEÑA
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/;

        if (!passwordRegex.test(password)) {
            $('#password').addClass('is-invalid');
            validacion = false;
        } else {
            $('#password').addClass('is-valid');
        }

        //SI SE VALIDAN LAS CREDENCIALES SE MUESTRA EL MENSAJE Y SE REDIRECCIONA        
        if (validacion) {
            $('#inicioSesion').removeClass('d-none');

            setTimeout(() => {
               window.location.href = 'menu.html';
            }, 1500);
        }
    });

    $('#email, #password').on('input', function(){
        $(this).removeClass('is-invalid is-valid');
    });
});