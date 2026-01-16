const KEY_TOTAL = "saldoTotal";
const KEY_HISTORIAL = "historialMontos";

$(document).ready(function () {

    let saldo = parseFloat(localStorage.getItem(KEY_TOTAL)) || 0;
    $('#saldoTotal').text(saldo.toLocaleString('es-CL'));

    $('#btnDepositar').on('click', function () {

        const montoIngresado = parseFloat($('#montoDepositado').val());

        //VALIDACION DE NUMERO Y MOSTRAR ERROR
        if (isNaN(montoIngresado) || montoIngresado <= 0) {
            const toast = new bootstrap.Toast($('#error')[0]);
            toast.show();
            return;
        }

        //SUMAR Y ACTUALIZAR SALDO
        saldo += montoIngresado;
        localStorage.setItem(KEY_TOTAL, saldo);

        $('#saldoActual').text(saldo.toLocaleString('es-CL'));

        const historial = JSON.parse(localStorage.getItem(KEY_HISTORIAL)) || [];
        
        //AGREGAR EL DEPOSITO AL HISTORIAL
        historial.push({
            tipo: "ingreso",
            monto: montoIngresado,
            descripcion: "Depósito",
            fecha: new Date().toLocaleString("es-CL")
        });

        localStorage.setItem(KEY_HISTORIAL, JSON.stringify(historial));

        //MUESTRA EL MONTO DEPOSITADO
        $('#montoConfirmado').text(montoIngresado.toLocaleString('es-CL'));
        $('#confirmacionDeposito').removeClass('d-none');

        $('#montoDepositado').val('');

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 2000);
    });
});