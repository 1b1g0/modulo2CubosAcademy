const { banco, contas } = require('./bancodedados.js');

const autenticarBanco = (req, res, next) => {
    const erroSenha = {
        "mensagem": "A senha do banco informada é inválida!"
    }
    const erroQuery = {
        "mensagem" : "Consulta inválida."
    }
    const senhaConsulta = req.query.senha_banco;
    if (!senhaConsulta) {
        return res.status(400).json(erroQuery);
    }
    //console.log(senhaConsulta, banco.senha);
    senhaConsulta === banco.senha ? next() : res.status(401).json(erroSenha);

};

const autenticarUsuario = (req, res, next) => {
    const mensagemErroConta = {
        "mensagem": "Conta bancária não encontada!"
    };
    const mensagemErroSenha = {
        "mensagem": "Senha informada incorreta."
    }
    const senha = req.query.senha;
    const numeroConta = req.query.numero_conta;
    const contaSelecionada = contas.find(conta => conta.numero === Number(numeroConta));
    if (!contaSelecionada) {
        return res.status(400).json(mensagemErroConta);
    }
    if (contaSelecionada.usuario.senha === senha){
        return next();
    } else {
        return res.status(401).json(mensagemErroSenha)
    }
};

const validarCampoVazio = (req, res, next) => {
    const mensagemCampoVazio = {
        "mensagem": "É obrigatório informar todos os campos."
    };
    const camposReq = req.body;
    for(campo in camposReq) {
        if(!camposReq[campo]) {
            return res.status(401).json(mensagemCampoVazio);
        }
        //console.log(camposReq[campo])
    }
    next();
};

const validarCpfEmailUsuario = (req, res, next) => {
    //console.log('hi midlew')
    const mensagemUsrExiste = {
        "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
    };
    const { cpf, email } = req.body;
    const existeCpf = Boolean(contas.find((conta) => conta.usuario.cpf == cpf));
    const existeEmail = Boolean(contas.find((conta) => conta.usuario.email == email));
    if (existeCpf || existeEmail) {
        return res.status(400).json(mensagemUsrExiste);
    } else {
        next();
    };  
};

module.exports = {
    autenticarBanco,
    validarCpfEmailUsuario,
    validarCampoVazio,
    autenticarUsuario
}