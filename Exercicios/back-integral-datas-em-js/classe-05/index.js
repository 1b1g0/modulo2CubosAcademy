const agora = new Date()

function taAberto (data) {
    const diaDaSemana = data.getDay();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    //console.log(diaDaSemana,hora, minutos)
    if ( diaDaSemana < 1 || hora < 8 || hora > 18) {
        return false;
    } 
    if ( hora === 18 && minutos > 0 && diaDaSemana < 6) {
        return false;
    } 
    if ( diaDaSemana === 6 && hora < 8 && hora > 12 ){
        return false;
    }
    if ( diaDaSemana === 6 && (hora === 12 && minutos === 0) ){
        return true;
    }
    return true;
};

console.log(taAberto(new Date(2021,3,24,9,30)));
