const express = require('express');
const app = express();
const PORT = 8000;

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
const totalDeJogadores = jogadores.length;
let controleJogador = 0;

function jogadorAtual(jogadores) {
    // se o indice chegar no length
    if (controleJogador === totalDeJogadores - 1){
        let jogador = jogadores[0];
        controleJogador = 0;
        return jogador;
    } 
    else {
        let jogador = jogadores[controleJogador];
        controleJogador++;
        return jogador;
    }
}

app.listen(PORT);

app.get('/', (req, res) => {
    const resposta = `É a vez de ${jogadorAtual(jogadores)} jogar!`;
    res.send(resposta);
});
app.get('/remover', (req, res) => {
    const indiceJogador = req.query.indice;
    if (jogadores[indiceJogador]) {
        jogadores.splice(indiceJogador,1)
        res.send(jogadores);
    }  
    else {
        res.send(`Não existe jogador no índice informado (${indiceJogador}) para ser removido.`)
    }
    
});
app.get('/adicionar', (req, res) => {
    const indice = req.query.indice;
    const nome = req.query.nome.replace(req.query.nome[0], req.query.nome[0].toUpperCase());

    if (indice > totalDeJogadores) {
        res.send(`O índice informado (${indice}) não existe no array. ${nome} não adicionado.`);
    } else {
        if (!indice) {
            jogadores.push(nome);
            res.send(jogadores);
        } 
        else {
            jogadores.splice(indice, 0, nome);
            res.send(jogadores);
        } 
    }
   
});