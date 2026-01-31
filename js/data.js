const day = document.querySelector(".day");
const mesAno = document.querySelector(".mes-ano");

const agora = new Date();

let dia = agora.getDate()
day.textContent = String(dia); // Coleta o dia
let mesEscrito = agora.toLocaleDateString('pt-BR', { month: 'long' });
let mesNum = agora.getMonth() + 1;
let ano = String(agora.getFullYear());

function zeroAEsquerda(valor) {
    return valor <= 9 ? `0${valor}` : String(valor); // condição ? retorne isso, senão : isso!
}

let idDia = ano + zeroAEsquerda(mesNum) + zeroAEsquerda(dia);
console.log(idDia)

mesAno.textContent = `de ${mesEscrito} de ${ano}`;
console.log(mesEscrito, ano);
export {idDia};