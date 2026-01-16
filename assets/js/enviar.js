$(function () {
    const KEY_TOTAL = "saldoTotal";

    if (!localStorage.getItem(KEY_TOTAL)) {
        localStorage.setItem(KEY_TOTAL, 0);
    }

    function mostrarSaldo() {
        const saldo = Number(localStorage.getItem(KEY_TOTAL)) || 0;
        $("#saldoTotal").text(saldo.toLocaleString("es-CL"));
    }

    mostrarSaldo();

    const contacto = JSON.parse(localStorage.getItem("contactoSeleccionado"));
    let saldoMenu = Number(localStorage.getItem("saldoTotal"));

    $("#rut").text(contacto.rut);
    $("#nombre").text(contacto.nombre);
    $("#banco").text(contacto.banco);

    $("#btnConfirmar").on("click", function () {

        const montoEnvio = Number($("#enviarMonto").val());

        if (!montoEnvio || montoEnvio <= 0) {
            mostrarError("Ingrese un monto válido");
            return;
        }

        if (montoEnvio > saldoMenu) {
            mostrarError("Saldo insuficiente");
            return;
        }

        //DESCONTAR SALDO
        saldoMenu -= montoEnvio;
        localStorage.setItem("saldoTotal", saldoMenu);

        let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

        //DATOS DE NUEVA TRANSACCION
        const nuevaTransaccion = {
            nombre: contacto.nombre,
            monto: montoEnvio,
            fecha: new Date().toLocaleString()
        };

        transacciones.push(nuevaTransaccion);
        localStorage.setItem("transacciones", JSON.stringify(transacciones));


        $("#montoEnviado").text(montoEnvio.toLocaleString('es-CL'));
        $("#confirmacionEnvio").removeClass("d-none");

        $("#btnConfirmar").prop("disabled", true);

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 2000);
    });

    function mostrarError(mensaje) {
        const alerta = `
            <div class="alert alert-danger text-center mt-3">
                ${mensaje}
            </div>
        `;
        $("#confirmacionEnvio").html(alerta).removeClass("d-none");
    }

})