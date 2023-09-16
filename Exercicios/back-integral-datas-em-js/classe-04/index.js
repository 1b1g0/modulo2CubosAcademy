const agora = new Date();

function taAberto (data) {
    const diaDaSemana = data.getDay();
    const hora = data.getHours();

    if (diaDaSemana > 5 || diaDaSemana < 1 || hora < 8){
        return false;
    } else if (hora == 18 && data.getMinutes() > 0 ) {
        return false;
    } else {
        return true;
    }
};

console.log(taAberto(new Date(2021,3,26,7,59)));
