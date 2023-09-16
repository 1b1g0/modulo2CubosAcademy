const { Router } = require('express')
const roteador = Router();
const { buscaCep } = require('./controladores.js')

roteador.get('/enderecos/:cep', buscaCep);

module.exports = roteador;