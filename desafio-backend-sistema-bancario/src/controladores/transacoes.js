const { contas, depositos, saques, transferencias } = require('../bancodedados.js');

const formatarData = () => {
    const data = new Date();
    const horarioFormatado = data.toLocaleDateString("pt-BR",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).slice(12);
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataFormatada = `${data.getFullYear()}-${mes}-${dia} ${horarioFormatado}`;
    //console.log(dataFormatada)
    return dataFormatada;
}

const depositar = (req, res) => {
    const mensagemErroValor = {
        "mensagem": "Valor para depósito inválido."
    };
    const numeroConta = Number(req.body.numero_conta);
    const valorDeposito = req.body.valor;
    if (valorDeposito <= 0) { return res.status(400).json(mensagemErroValor) };

    const contaDeposito = contas.find(conta => conta.numero === numeroConta);
    const dataRegistro = formatarData();

    const registroDeposito = {
        "data": dataRegistro,
        "numero_conta": String(numeroConta),
        "valor": valorDeposito
    };
    contaDeposito.saldo += valorDeposito;
    depositos.push(registroDeposito);
    return res.status(200).json();
}

const sacar = (req, res) => {
    const mensagemCampoVazio = {mensagem: "É necessário informar todos os campos no corpo da requisição."};
    const mensagemErroConta = {mensagem: "Conta inexistente."};
    const mensagemErroSenha = {mensagem: "Senha incorreta."};
    const mensagemErroSaldo = {mensagem: "Saldo insuficiente, transação cancelada."};

    const { numero_conta, valor, senha } = req.body;
    const contaSaque = contas.find(conta =>  conta.numero === Number(numero_conta));
    const dataFormatada = formatarData();
    
    if (!numero_conta || !valor || !senha) { return res.status(400).json(mensagemCampoVazio)};
    if (!contaSaque) { return res.status(400).json(mensagemErroConta)};
    if (contaSaque.usuario.senha !== senha) { return res.status(401).json(mensagemErroSenha)};
    if (contaSaque.saldo < valor) { return res.status(400).json(mensagemErroSaldo)};

    contaSaque.saldo -= valor;
    const registroSaque = {
        data: dataFormatada,
        numero_conta: numero_conta,
        valor: valor
    };
    saques.push(registroSaque);
    return res.status(201).json();
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const contaOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numero === Number(numero_conta_destino));
    
    if (!contaDestino || !contaOrigem) { return res.status(400).json({mensagem: "Conta informada não existe."}) };
    if (contaOrigem.usuario.senha !== senha) { return res.status(400).json({mensagem: "Senha incorreta."}) };
    if (contaOrigem.saldo < valor) { return res.status(400).json({mensagem: "Saldo insuficiente."}) };

    const dataRegistro = formatarData();
    const registro = {
        data: dataRegistro,
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    };
    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    transferencias.push(registro);

    return res.status(201).json();
};

module.exports = {
    depositar,
    sacar,
    transferir
}
