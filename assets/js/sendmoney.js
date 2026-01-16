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

    const datos = JSON.parse(localStorage.getItem("listaDatos")) || [];
    const tabla = $("#tablaContactos");
    const btnEnviar = $("#btnEnviar");

    const formContacto = $("#contactoNuevo");
    const btnAgregarContacto = $("#btnAgregarContacto");
    const btnEliminarContacto = $("#btnEliminarContacto");

    // Ocultar formulario y botón enviar
    formContacto.addClass("d-none");
    btnEnviar.addClass("d-none");

    // MOSTRAR / OCULTAR FORMULARIO
    btnAgregarContacto.on("click", function () {
        formContacto.toggleClass("d-none");
    });

    function mostrarContactos(lista) {
        tabla.empty();

        lista.forEach((item, index) => {
            tabla.append(`
                <tr class="fila-contacto" data-index="${index}">
                    <td><input type="radio" name="contacto" value="${index}"></td>
                    <td>${item.rut}</td>
                    <td>${item.nombre}</td>
                    <td>${item.banco}</td>
                </tr>
            `);
        });
    }

    mostrarContactos(datos);

    let contactoSeleccionado = null;

    // SELECCIONAR / DESELECCIONAR CONTACTO
    $(document).on("click", ".fila-contacto", function () {
        const radio = $(this).find('input[type="radio"]');
        const index = radio.val();

        if (contactoSeleccionado === index) {
            radio.prop("checked", false);
            contactoSeleccionado = null;
            $(".fila-contacto").removeClass("table-primary");
            btnEnviar.addClass("d-none");
            return;
        }

        contactoSeleccionado = index;
        $('input[name="contacto"]').prop("checked", false);
        $(".fila-contacto").removeClass("table-primary");

        radio.prop("checked", true);
        $(this).addClass("table-primary");
        btnEnviar.removeClass("d-none");
    });

    // BUSCAR CONTACTOS
    $("#btnBuscar").on("click", function () {
        const texto = $("#buscar").val().toLowerCase().trim();

        const filtrados = datos.filter(c =>
            c.rut.includes(texto) ||
            c.nombre.toLowerCase().includes(texto) ||
            c.banco.toLowerCase().includes(texto)
        );

        mostrarContactos(filtrados);
        btnEnviar.addClass("d-none");
    });

    $("#buscar").on("input", () => $("#btnBuscar").click());

    // ENVIAR DINERO
    btnEnviar.on("click", function () {
        if (contactoSeleccionado === null) return;

        const contacto = datos[contactoSeleccionado];
        localStorage.setItem("contactoSeleccionado", JSON.stringify(contacto));
        window.location.href = "enviar.html";
    });

    // AGREGAR CONTACTO
    formContacto.on("submit", function (e) {
        e.preventDefault();

        datos.push({
            rut: $("#rut").val(),
            nombre: $("#nombre").val() + " " + $("#apellido").val(),
            banco: $("#banco").val()
        });

        localStorage.setItem("listaDatos", JSON.stringify(datos));
        mostrarContactos(datos);

        this.reset();
        formContacto.addClass("d-none");
    });

    // ELIMINAR CONTACTO
    btnEliminarContacto.on("click", function () {
        if (contactoSeleccionado === null) {
            alert("Seleccione un contacto para eliminar");
            return;
        }

        if (!confirm("¿Seguro que desea eliminar este contacto?")) return;

        datos.splice(contactoSeleccionado, 1);
        localStorage.setItem("listaDatos", JSON.stringify(datos));

        contactoSeleccionado = null;
        mostrarContactos(datos);
        btnEnviar.addClass("d-none");
    });

});