function promo (inicioPromo, dataCompra) {
    const inicioTimestamp = +inicioPromo;
    const compraTimestamp = +dataCompra;
    const finalTimestamp = inicioTimestamp + 1000*60*60*24;

    if (compraTimestamp < finalTimestamp && compraTimestamp > inicioTimestamp) {
        return true;
    } else {
        return false;
    }
};

const inicio = new Date (2023,1,1,10);
const compra = new Date (2023,1,2,10);

console.log(promo(inicio, compra))
