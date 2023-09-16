const produtos = require('../bancodedados/produtos.js')
const { getCityFromZipcode, getStateFromZipcode } = require('utils-playground');

const listarProdutos = async (req, res) => {
    try{
       return await res.json(produtos);
    } catch(erro){
        return res.json(`Erro: ${erro.message}`)
    }
}
const selecionarProduto = async (req, res) => {
    const mensagemNaoEncontrado = {
        "mensagem": "Não existe produto com o ID informado."
    };
    const idProduto = Number(req.params.idProduto);
    try{
        const produtoSelecionado = await produtos.find(prod => prod.id === idProduto);
        if (!produtoSelecionado) {
            return res.status(404).json(mensagemNaoEncontrado);
        }
        return res.json(produtoSelecionado)

    } catch (erro) {
        return res.json(`Erro: ${erro.message}`)
    }
}
const calcularFrete = async (req, res) => {
    const mensagemCepIncorreto = { 
        "mensagem": "Endereço não encontrado, verifique o CEP inserido"
    };
    const { idProduto, cep } = req.params;

    try {
        const produto = await produtos.find(prod => prod.id === Number(idProduto));
        const estado = await getStateFromZipcode(cep);
        if (!estado) {
            return res.status(400).json(mensagemCepIncorreto)
        }
        let porcentagemDecimalFrete = 0.12;
        // checando % frete.
        switch (estado) {
            case "BA":
            case "SE":
            case "AL":
            case "PE":
            case "PB":
                porcentagemDecimalFrete = 0.10;
                break;

            case "SP":
            case "RJ":
                porcentagemDecimalFrete = 0.15;
                break;
        }
        const valorFrete = produto.valor * porcentagemDecimalFrete;
        const resposta = {
            "produto" : {
                "id": produto.id,
                "nome": produto.nome,
                "valor": produto.valor
            },
            "estado": estado,
            "frete": valorFrete 
        };
        return res.json(resposta)
    } catch (erro) {
        res.json(`Erro: ${erro.message}`)
    }
};

module.exports = {
    listarProdutos,
    selecionarProduto,
    calcularFrete
}
