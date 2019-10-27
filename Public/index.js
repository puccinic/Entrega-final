let data = {};

$('.round-button').on('click', function () {
    $(this).toggleClass('green');
    const id = $(this).attr('id');
    data.Estados = {};
    data.Estados[id] = $(this).hasClass('green');
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
        $("#emergencia").text("Reactivar");
        $(".round-button").attr("disabled", true);
        $('#indicador').addClass('visible');
        $('.round-button').removeClass('green');
        $("#emergencia").addClass('blue');
        const buttons = $('.round-button').toArray();
        buttons.forEach(element => {
            const id = $(element).attr('id');
            data.Estados['id'] == false;
        });
    }
    else {
        $("#emergencia").text("Emergencia");
        $(".round-button").attr("disabled", false);
        $('#indicador').removeClass('visible');
        $("#emergencia").removeClass('blue');
    }
    data.Estados = {};
    data.Estados.emergencia = $(this).hasClass('blue');
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
                        $('#indicador').addClass('visible');
                        $('.round-button').removeClass('green');
                        $("#emergencia").addClass('blue');
                    } else {
                        $('#indicador').removeClass('visible');
                        $("#emergencia").removeClass('blue');
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
}

window.setInterval(update, 2000);