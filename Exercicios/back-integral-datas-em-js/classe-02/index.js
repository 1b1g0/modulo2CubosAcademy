const fs = require('fs/promises');
const la = async () => {
    try {
        const arquivo = await fs.readFile('./dados.json');
        const dadosFormatados = JSON.parse(arquivo);
        // const dataA = new Date(dadosFormatados[0].registered);
         dadosFormatados.sort((a,b) => {
            const dataA = new Date(a.registered);
            const timestampA = +dataA;
            const dataB = new Date(b.registered);
            const timestampB = +dataB;

            return timestampA - timestampB;
        }) 
        console.log(dadosFormatados)
    } catch (erro) {
        console.log(erro.message);
    }
}
la()
