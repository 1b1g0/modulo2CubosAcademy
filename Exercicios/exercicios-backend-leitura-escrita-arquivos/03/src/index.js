const express = require('express');
const app = express();
const roteador = require('./roteador.js')

app.listen(3000);
app.use(roteador);
