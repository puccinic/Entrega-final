let data = {};

$('.round-button').on('click', function () {
    $(this).toggleClass('green');
    const id = $(this).attr('id');
    data.Estados = {};
    data.Estados[id] = $(this).hasClass('green');
    $.post('/', data);
});

$('#emergencia').click(emergenciaOnClick);

$(".btn.btn-info.btn-lg").on('click', update);

$('.segundo').on('click', update);

$('.tercero').on('click', function () {
    data.Tablero = 'Nodo_611';
    $.get('/refresh', data, function (data) {
        $('tbody').html('');
        data.forEach(element => {
            const tableRow = `<tr>
                            <td>${element.gen1}</td>
                            <td>${element.gen2}</td>
                            <td>${element.gen3}</td>
                            <td>${element.carga}</td>
                            <td>${element.linea}</td>
                            <td>${element.cap}</td>
                            <td>${element.emergencia}</td>
                            <td>${new Date(element.time).toLocaleString()}</td>                          
                              </tr>`;
            $('tbody').append(tableRow);
        });
    });
});

$('#his-button').on('click', function () {
    const data = {
        Tablero: "Nodo_611",
        initTime: new Date($('#init-date').val()).getTime(),
        finalTime: new Date($('#final-date').val()).getTime()
    }
    $.post('/search', data, function (data) {
        $('tbody').html('');
        if (data.length === 0) {
            alert('no hay datos disponibles para este rango de fechas');
        } else {
            data.forEach(element => {
                const tableRow = `<tr>
                            <td>${element.gen1}</td>
                            <td>${element.gen2}</td>
                            <td>${element.gen3}</td>
                            <td>${element.carga}</td>
                            <td>${element.linea}</td>
                            <td>${element.cap}</td>
                            <td>${element.emergencia}</td>
                            <td>${new Date(element.time).toLocaleString()}</td>                          
                              </tr>`;
                $('tbody').append(tableRow);

            });
        }
    });
});

    function emergenciaOnClick() {

        $('#indicador').toggleClass('visible');
        $('.round-button').removeClass('green');
        $("#emergencia").toggleClass('blue');
        data.Estados = {};
        data.Estados.emergencia = $(this).hasClass('blue');
        $.post('/', data);

        if ($("#emergencia").text() == 'Emergencia') {
            $("#emergencia").text("Reactivar");
            $(".round-button").attr("disabled", true);
        }
        else {

            $("#emergencia").text("Emergencia");
            $(".round-button").attr("disabled", false);
        }
    }

    function update() {

        data.Tablero = 'Nodo_611';

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
    }
