const roteador = require('./roteador.js');
const express = require('express');
const app = express();
const port = 8000;

app.use(roteador);
app.listen(port);