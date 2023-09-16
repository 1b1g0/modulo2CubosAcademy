/* 
4 rotas get \/ + 2 parametros = num 1 e 2.
/somar
/subtrair
/multiplicar
/dividir
*/

const express = require('express');
const app = express();
const port = 8000;

app.listen(port);

app.get('/',(req,res) => {
    res.send('helloWorld');
});

app.get('/somar', (req, res) => {
    const n1 = Number(req.query.num1);
    const n2 = Number(req.query.num2);
    res.send(`${n1 + n2}`);
});

app.get('/subtrair', (req, res) => {
    const n1 = Number(req.query.num1);
    const n2 = Number(req.query.num2);
    res.send(`${n1 - n2}`);
});

app.get('/multiplicar', (req, res) => {
    const n1 = Number(req.query.num1);
    const n2 = Number(req.query.num2);
    res.send(`${n1 * n2}`);
});

app.get('/dividir', (req, res) => {
    const n1 = Number(req.query.num1);
    const n2 = Number(req.query.num2);
    res.send(`${n1 / n2}`);
});
