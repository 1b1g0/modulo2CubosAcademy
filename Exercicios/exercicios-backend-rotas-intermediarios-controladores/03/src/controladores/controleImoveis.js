const {imoveis} = require('../imoveis.js')
const retornarImoveis = (req, res) => {
    res.send(imoveis)
};
const consultarImovelId = (req, res) => {
    const id = Number(req.params.id);
    let output = imoveis.find((imovel) => imovel.id == id );
    if (!output) {
        output = 'Imó';
    }
    res.send(output)
};
module.exports = {
    retornarImoveis,
    consultarImovelId
}
