const { contas } = require('../bancodedados.js');
// post
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contasExistentes = contas.length;
    let numConta = 0;

    if (contasExistentes) {
        const ultimaConta = contas[contasExistentes - 1].numero;
        numConta = ultimaConta + 1;
    };
    const novoUsuario = {
        "numero": numConta,
        "saldo": 0,
        "usuario": {
            "nome": nome,
            "cpf": cpf,
            "data_nascimento": data_nascimento,
            "telefone": telefone,
            "email": email,
            "senha": senha,
        }
    };
    contas.push(novoUsuario);
    res.status(201).json();
};
// delete
const deletarConta = (req, res) => {
    const numeroConta = req.params.numeroConta;
    const mensagemErroSaldo = {
        "mensagem": "A conta só pode ser removida se o saldo for zero!"
    };
    const mensagemErroParam = {
        "mensagem": "Parametro inválido"
    };
    const contaDeletar = contas.find(conta => conta.numero === Number(numeroConta));
    if (!numeroConta || !contaDeletar) {
        return res.status(400).json(mensagemErroParam)
    }
    
    if (contaDeletar.saldo !== 0) {
        return res.status(405).json(mensagemErroSaldo);
    }
    contas.splice(contaDeletar, 1);
    return res.status(200).json();
};
// put
const atualizarUsuario = (req, res) => {
    const numeroConta = Number(req.params.numeroConta);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contaAntiga = contas.find(conta => conta.numero == numeroConta);
    const dadosAtualizados = {
        "nome": nome,
        "cpf": cpf,
        "data_nascimento": data_nascimento,
        "telefone": telefone,
        "email": email,
        "senha": senha
    };
    contaAntiga.usuario = dadosAtualizados;

    return res.status(200).json()
};

module.exports = {
    criarConta,
    deletarConta,
    atualizarUsuario,
}