
const express = require('express');
const app = express();
const roteador = require('./roteador.js');
const port = 3000;

app.use(roteador);
app.listen(port);
