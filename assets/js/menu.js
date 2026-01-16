$(function(){
    $('.btn-action').on('click', function(){
        const url = $(this).data('url');
        location.href = url;
    });
 
    const KEY_TOTAL = "saldoTotal";

    if(!localStorage.getItem(KEY_TOTAL)){
        localStorage.setItem(KEY_TOTAL, 0);
    }

    mostrarSaldo();

    function mostrarSaldo(){
        const saldo = Number(localStorage.getItem(KEY_TOTAL)) || 0;
        $("#saldoTotal").text(saldo.toLocaleString("es-CL"));
    }
 
});