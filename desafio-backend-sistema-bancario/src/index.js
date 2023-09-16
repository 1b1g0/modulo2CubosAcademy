const express = require('express');
const app = express();
const roteador = require('./roteador.js');

app.use(express.json());
app.use(roteador);
app.listen(3000);