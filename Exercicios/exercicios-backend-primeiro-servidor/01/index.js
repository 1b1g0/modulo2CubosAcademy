const express = require('express');
const app = express();
const PORT = 3000;

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
const totalDeJogadores = jogadores.length;
let controleJogador = 0;

app.get('/', function(req, res){
    const resposta = `É a vez de ${jogadorAtual(jogadores)} jogar!`;
    res.send(resposta);
    controleJogador >= totalDeJogadores - 1 ? controleJogador = 0 : controleJogador++;
});

app.listen(PORT);

function jogadorAtual(jogadores) {
    return jogadores[controleJogador];
}