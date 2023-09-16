function taAberto(data) {
    const abertura = new Date();
    const fechamento = new Date();
    fechamento.setHours(18, 1);
    abertura.setHours(8, 0);
    //console.log(`${abertura.getHours()}:${abertura.getMinutes()}\n${fechamento.getHours()}:${fechamento.getMinutes()}`);
    
    if (data.getHours() < abertura.getHours() || ((data.getHours() > fechamento.getHours()) && data.getMinutes() < fechamento.getMinutes())) {
        return false;
    } else {
        return true;
    }
    //console.log(data.getHours())
}
console.log(taAberto(new Date(2015,1,1,12)));