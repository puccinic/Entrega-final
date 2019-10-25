$('.round-button').on('click',function() {
    $(this).toggleClass('red');
    $(this).toggleClass('green');
});

$('#emergencia').click(function() {
  $('#indicador').toggleClass('invisible');
  $('#indicador').toggleClass('visible');
  $('#gen1').removeClass('green');
  $('#gen2').removeClass('green');
  $('#gen3').removeClass('green');
  $('#carga').removeClass('green');
  $('#linea').removeClass('green');
  $('#capacitor').removeClass('green');
  $('#emergencia').toggleClass('blue');
  if ($("#emergencia").text("Emergencia")) {
      $("#emergencia").text("Reactivar");
   }
   else {
      $("#emergencia").text("Emergencia");
   }

  if ($("#gen1").attr("disabled") || $("#gen2").attr("disabled") || $("#gen3").attr("disabled")
      || $("#carga").attr("disabled") || $("#linea").attr("disabled") || $("#capacitor").attr("disabled")) {
        $("#gen1").removeAttr("disabled");
        $("#gen2").removeAttr("disabled");
        $("#gen3").removeAttr("disabled");
        $("#carga").removeAttr("disabled");
        $("#linea").removeAttr("disabled");
        $("#capacitor").removeAttr("disabled");
    } else {
        $("#gen1").attr("disabled", "disabled");
        $("#gen2").attr("disabled", "disabled");
        $("#gen3").attr("disabled", "disabled");
        $("#carga").attr("disabled", "disabled");
        $("#linea").attr("disabled", "disabled");
        $("#capacitor").attr("disabled", "disabled");
    }
});

$(".btn.btn-info.btn-lg").on('click',function() {
    data = {
        Tablero: $(this).attr('id'),
    }
    $.get('/refresh', data, function(data){
        console.log(data);
        const keys = Object.keys(data[0]);
        const values = Object.values(data[0]);
        for (let i = 1; i < keys.length-1; i++){
            if (keys[i] == 'emergencia'){
                if (values[i] == '1'){
                    alert("El boton de alerta se encuentra Activado");
                }
                continue;
            }
            switch (values[i]){
                case 1:
                    $('#'+keys[i]).addClass('green').removeClass('red');
                    break;
                default:
                    $('#'+keys[i]).addClass('red').removeClass('green');
                    break;
            }
        }
    });
});
