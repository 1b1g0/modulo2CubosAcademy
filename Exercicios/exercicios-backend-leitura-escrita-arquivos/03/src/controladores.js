const fs = require('fs/promises');
const { listenerCount } = require('process');
const { buscarEndereco } = require('utils-playground')

const buscaCep = async (req, res) => {
    const cepReq = req.params.cep;
    const cepFormatado = `${cepReq.slice(0,5)}-${cepReq.slice(-3)}`;
    try {
        const enderecosJSON = await fs.readFile('./src/enderecos.json');
        const listaEnderecos = JSON.parse(enderecosJSON);

        // checando se existe no json.
        for (const endereco of listaEnderecos) {
            console.log(endereco, cepFormatado)
            if (endereco.cep == cepFormatado) {
                console.log('existo na lista')
                return res.json(endereco);
            }
        }
        const endereco = await buscarEndereco(cepReq);
        listaEnderecos.push(endereco);

        const listaEnderecosString = JSON.stringify(listaEnderecos);
        await fs.writeFile('./src/enderecos.json', listaEnderecosString);
        console.log(listaEnderecosString);
        return res.json(endereco)
        
    } catch (erro) {
        return res.json(`Erro: ${erro.message}`)
    }
};

module.exports = {
    buscaCep
}