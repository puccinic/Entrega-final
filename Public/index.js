let data = {};

$('.round-button').on('click', function () {
    $(this).toggleClass('on');
    const id = $(this).attr('id');
    data.Estados = {};
    data.Estados[id] = $(this).hasClass('on');
    $.post('/', data);
});

$('#emergencia').click(emergenciaOnClick);

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

    if ($("#emergencia").text() == 'Emergencia') {
        $('#emergencia').addClass('on');
        const buttons = $('.round-button').toArray();
        buttons.forEach(element => {
            const id = $(element).attr('id');
            data.Estados['id'] == false;
        });
    }
    else {
        $('#emergencia').removeClass('on');
    }
    data.Estados = {};
    data.Estados.emergencia = $('#emergencia').hasClass('on');
    $.post('/', data);
}

function update() {
    if ($('#n611').hasClass('in')){
        data.Tablero = 'Nodo_611';

        $.get('/refresh', data, function (data) {
            console.log(data);
            const keys = Object.keys(data[0]);
            const values = Object.values(data[0]);
            for (let i = 1; i < keys.length - 1; i++) {
                if (keys[i] == 'emergencia') {
                    if (values[i] == '1') {
                        $(".round-button").attr("disabled", true);
                        $("#emergencia").text("Reactivar");
                        $('#indicador').addClass('visible');
                        $('.round-button').removeClass('green');
                        $("#emergencia").addClass('blue');
                        $('#emergencia').addClass('on');
                    } else {
                        $(".round-button").attr("disabled", false);
                        $("#emergencia").text("Emergencia");
                        $('#indicador').removeClass('visible');
                        $("#emergencia").removeClass('blue');
                        $('#emergencia').removeClass('on');
                    }

                    continue;
                }
                switch (values[i]) {
                    case 1:
                        $('#' + keys[i]).addClass('green').addClass('on');
                        break;
                    default:
                        $('#' + keys[i]).removeClass('green').removeClass('on');
                        break;
                }
            }
        });
    }
}

window.setInterval(update, 2000);