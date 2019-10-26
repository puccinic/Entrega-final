let data = {};

$('.round-button').on('click', function () {
    $(this).toggleClass('green');
    const id = $(this).attr('id');
    data.Estados = {};
    data.Estados[id] = $(this).hasClass('green');
    $.post('/',data);
});

$('#emergencia').click(emergenciaOnClick);

$(".btn.btn-info.btn-lg").on('click', function () {

    data.Tablero = $(this).attr('id');

    $.get('/refresh', data, function (data) {
        console.log(data);
        const keys = Object.keys(data[0]);
        const values = Object.values(data[0]);
        for (let i = 1; i < keys.length - 1; i++) {
            if (keys[i] == 'emergencia') {
                if (values[i] == '1') {
                    alert("El boton de alerta se encuentra Activado");
                    emergenciaOnClick();
                }
                continue;
            }
            switch (values[i]) {
                case 1:
                    $('#' + keys[i]).addClass('green').removeClass('red');
                    break;
                default:
                    $('#' + keys[i]).addClass('red').removeClass('green');
                    break;
            }
        }
    });
});



function emergenciaOnClick() {

    $('#indicador').toggleClass('visible');
    $('.round-button').removeClass('green');
    $("#emergencia").toggleClass('blue');
    data.Estados = {};
    data.Estados.emergencia = $(this).hasClass('blue');
    $.post('/',data);
    
    if ($("#emergencia").text() == 'Emergencia') {
        $("#emergencia").text("Reactivar");
        $("#gen1").attr("disabled", true);
        $("#gen2").attr("disabled", true);
        $("#gen3").attr("disabled", true);
        $("#carga").attr("disabled", true);
        $("#linea").attr("disabled", true);
        $("#cap").attr("disabled", true);
    }
    else {
        $("#emergencia").text("Emergencia");
        $("#gen1").attr("disabled", false);
        $("#gen2").attr("disabled", false);
        $("#gen3").attr("disabled", false);
        $("#carga").attr("disabled", false);
        $("#linea").attr("disabled", false);
        $("#cap").attr("disabled", false);
    }
}