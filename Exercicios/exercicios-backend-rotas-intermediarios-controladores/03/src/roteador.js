
const express = require('express');
const roteador = express.Router();
const { retornarImoveis, consultarImovelId } = require('./controladores/controleImoveis.js');

roteador.get('/', retornarImoveis);
roteador.get('/:id', consultarImovelId);

module.exports = roteador;