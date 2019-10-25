$('.round-button').on('click',function() {
    $(this).toggleClass('red');
    $(this).toggleClass('green');
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