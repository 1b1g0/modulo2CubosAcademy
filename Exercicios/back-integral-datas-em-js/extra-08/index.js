function a (data) {
    const dia = data.getDay().toString().padStart(2,"0");
    const mes = data.toLocaleDateString("pt-BR",{ month: "long"});
    console.log(`a) ${dia} de ${mes} de ${data.getFullYear()}`);
}
function b (data) {
    const dataFormatada = data.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    console.log(`b) ${dataFormatada}`);
}
function c (data) {
    const diaF = data.toLocaleDateString("pt-BR", { day: "numeric" });
    const mes = data.toLocaleDateString("pt-BR", { month: "short" });
    console.log(`c) ${diaF} ${mes.slice(0,3)}`);
}
function d (data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const ano = data.getFullYear();
    const mes = data.toLocaleDateString("pt-BR", { month: "short" }).slice(0,3);

    console.log(`d) ${dia} ${mes} ${ano}`)
}
function e (data) {
    const dia = data.getDate().toString().padStart(2,'0');
    const mes = data.toLocaleDateString("pt-BR", { month: "short" }).slice(0,3);
    const ano = data.getFullYear();
    console.log(`e) ${dia} de ${mes} de ${ano}`);
}
function f (data) {
    const dia = data.getDate().toString().padStart(2,'0');
    const mes = data.toLocaleDateString("pt-BR", { month: "short" }).slice(0,3);
    console.log(`f) ${dia}/${mes}`)
}

const agora = new Date();
a(agora);
b(agora);
c(agora);
d(agora);
e(agora);
f(agora);