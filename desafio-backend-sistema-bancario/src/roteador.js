const express = require('express');
const roteador = express.Router();
const { depositar, sacar, transferir } = require('./controladores/transacoes.js')
const { listarContas, consultaSaldo, consultaExtrato } = require('./controladores/consultas.js');
const { criarConta, deletarConta, atualizarUsuario,  } = require('./controladores/editar.js');
const { autenticarBanco, autenticarUsuario, validarCpfEmailUsuario, validarCampoVazio } = require('./intermediarios.js');

// done
// `/contas?senha_banco=Cubos123Bank`
roteador.get('/contas', autenticarBanco, listarContas);
// `POST` `/contas`
roteador.post('/contas', validarCampoVazio, validarCpfEmailUsuario, criarConta);
// `PUT` `/contas/:numeroConta/usuario`
// demorei 20 minutos pra achar o erro: esqueci '/' do caminho ¬¬
roteador.put('/contas/:numeroConta/usuario', validarCpfEmailUsuario, atualizarUsuario);
// `DELETE` `/contas/:numeroConta`
roteador.delete('/contas/:numeroConta', deletarConta);
// `POST` `/transacoes/depositar`
roteador.post('/transacoes/depositar', validarCampoVazio, depositar);
// `GET` `/contas/saldo?numero_conta=123&senha=123`
roteador.get('/contas/saldo', autenticarUsuario, consultaSaldo);
// `GET` `/contas/extrato?numero_conta=123&senha=123`
roteador.get('/contas/extrato', autenticarUsuario, consultaExtrato);
// `POST` `/transacoes/sacar`
roteador.post('/transacoes/sacar', validarCampoVazio, sacar);

// doing
// `POST` `/transacoes/transferir`
roteador.post('/transacoes/transferir', validarCampoVazio, transferir);

// todo
// :D
module.exports = roteador;