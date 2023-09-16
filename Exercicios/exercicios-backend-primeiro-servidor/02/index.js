const express = require('express');
const app = express();
const PORT = 8000;

let min = 0, seg = 0, ligado = false;

function atualizarRelogio() {
    if (seg === 59){
        seg = 0;
        min++;
    } else {
        seg++;
    }
    
    //console.log(min,seg)
}
function zerarRelogio() {
    min = 0;
    seg = 0;
}
// atualizar relógio cada 1 seg
setInterval(() => {
    if (ligado) {
        atualizarRelogio();
    }
},1000)

app.get('/', (req,res) =>{ 
    const output = `${String(min).padStart(2,'0')} minutos e ${String(seg).padStart(2,'0')} segundos`;
    res.send('Tempo atual do cronômetro: ' + output);
});

app.get('/iniciar', (req, res) => {
    ligado = true;
    res.send('Cronômetro iniciado!');
});

app.get('/pausar', (req, res) => {
    ligado = false;
    res.send('Cronômetro pausado!');
});

app.get('/continuar', (req, res) => {
    ligado = true;
    res.send('Cronômetro continuando!');
});

app.get('/zerar', (req, res) => {
    zerarRelogio();
    res.send('Cronômetro zerado!');
});

app.listen(PORT);
