const { contas, saques, depositos, transferencias } = require('../bancodedados.js');

const listarContas = (req, res) => {
    const mensagemContasVazia = {
        "mensagem": "Não há contas para exibir."
    }
    if (contas.length < 1) {
        return res.status(204).json(mensagemContasVazia);
    }
    return res.status(200).json(contas);
};

const consultaSaldo = (req, res) => {
    const numeroConta = Number(req.query.numero_conta);
    const contaConsulta = contas.find(conta => conta.numero === numeroConta);
    const corpoRes = {
        saldo: contaConsulta.saldo
    };
    return res.json(corpoRes)
};
const consultaExtrato = (req, res) => {
    // `/contas/extrato?numero_conta=123&senha=123`
    const numConta = req.query.numero_conta;
    const depositosConta = depositos.filter(deposito => deposito.numero_conta === numConta);
    const saquesConta = saques.filter(saque => saque.numero_conta === numConta);
    const tranferenciasEnviadas = transferencias.filter(tr => tr.numero_conta_origem === numConta);
    const tranferenciasRecebias = transferencias.filter(tr => tr.numero_conta_destino === numConta);

    const extrato = {
        depositos: depositosConta,
        saques: saquesConta,
        tranferenciasEnviadas: tranferenciasEnviadas,
        tranferenciasRecebias: tranferenciasRecebias
    }
    res.json(extrato);
};

module.exports = {
    listarContas,
    consultaSaldo,
    consultaExtrato
};