function promo (inicio, compra) {
    const inicioTimestamp = +inicio;
    const compraTimestamp = +compra;
    const finalTimestamp = inicioTimestamp + (1000*60*60*24*30);
    if (compraTimestamp < finalTimestamp && compraTimestamp > inicioTimestamp) {
        return true;
    } else {
        return false;
    }
};
const inicioPromo = new Date(2023,1,10);
const dataCompra = new Date(2023,2,12);
console.log(promo(inicioPromo, dataCompra));