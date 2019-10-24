$('.round-button').on('click',function() {
    $(this).toggleClass('red');
    $(this).toggleClass('green');
});


$(".btn.btn-info.btn-lg").on('click',function() {
    data = {
        Tablero: $(this).attr('id'),
    }
    $.get('/refresh', data, function(data){
        const keys = Object.keys(data);
        const values = Object.values(data);
        for (let i = 1; i < keys.length-1; i++){
            if (keys[i] == 'emergencia') continue;
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