const { buscarPaginaPokemons, buscarPokemonId } = require('./controlador.js')
const express = require('express');
const roteador = express();

roteador.get('/pokemon', buscarPaginaPokemons);
roteador.get('/pokemon/:id', buscarPokemonId);

module.exports = roteador;
