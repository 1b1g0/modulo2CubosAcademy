const express = require('express');
const roteador = express();
const { listarProdutos, selecionarProduto, calcularFrete } = require('./controladores/listagens.js');

roteador.get('/produtos', listarProdutos);
roteador.get('/produtos/:idProduto', selecionarProduto);
roteador.get('/produtos/:idProduto/frete/:cep', calcularFrete)


module.exports = roteador;