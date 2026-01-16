$(function () {
    const KEY_HISTORIAL = "historialMontos";
    const KEY_ENVIOS = "transacciones";
    const lista = $("#listaTransacciones");

    const historial = JSON.parse(localStorage.getItem(KEY_HISTORIAL)) || [];
    const envios = JSON.parse(localStorage.getItem(KEY_ENVIOS)) || [];

    const enviosFormateados = envios.map(e => ({
        tipo: "envio",
        monto: Number(e.monto),
        fecha: e.fecha,
        descripcion: `Transferencia a ${e.nombre}`
    }));

    const movimientos = [...historial, ...enviosFormateados].reverse();

    renderMovimientos(movimientos);

    $("#filtroTransferencia").on("change", function () {
        const filtro = $(this).val();

        if (filtro === "todos") {
            renderMovimientos(movimientos);
            return;
        }

        const filtrados = movimientos.filter(mov => mov.tipo === filtro);
        renderMovimientos(filtrados);
    });

    function renderMovimientos(listaMovimientos) {
        lista.empty();

        if (listaMovimientos.length === 0) {
            lista.append(
                `<li class = "list-group-item text-center text-muted">
                    No hay movimientos para este filtro
                </li>`
            );
            return;
        }

        listaMovimientos.forEach(mov => {
            const esIngreso = mov.tipo === "ingreso";
            const signo = esIngreso ? "+" : "-";
            const color = esIngreso ? "text-success" : "text-danger";

            lista.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        ${mov.descripcion || "Movimiento"}
                        <br>
                        <small class="text-muted">${mov.fecha}</small>
                    </span>
                    <span class="${color} fw-bold">
                        ${signo}$${formatearMoneda(mov.monto)}
                    </span>
                </li>
            `);
        });
    }
});

function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-CL').format(valor);
}