const legendaInput = document.querySelectorAll(".input-legenda");

legendaInput.forEach(input => {
    input.addEventListener("input", (event) => {
        const cor = event.dataset.cor;
        localStorage.setItem(`legendaNotas-${cor}`, event.value);
    })
    input.value = localStorage.getItem(`legendaNotas-${input.dataset.cor}`) || "Adicione uma legenda aqui...";
})

const inputAmarelo = document.querySelector(".input-amarelo");
const inputLaranja = document.querySelector(".input-laranja");
const inputVermelho = document.querySelector(".input-vermelho");
const inputVerde = document.querySelector(".input-verde");
const inputAzul = document.querySelector(".input-azul");

carregarLegendas()
function carregarLegendas() {
    inputAmarelo.value = localStorage.getItem("legendaNotas-amarelo") || "Adicione uma legenda aqui...";
    inputLaranja.value = localStorage.getItem("legendaNotas-laranja") || "Adicione uma legenda aqui...";
    inputVermelho.value = localStorage.getItem("legendaNotas-vermelho") || "Adicione uma legenda aqui...";
    inputVerde.value = localStorage.getItem("legendaNotas-verde") || "Adicione uma legenda aqui...";
    inputAzul.value = localStorage.getItem("legendaNotas-azul") || "Adicione uma legenda aqui...";
}