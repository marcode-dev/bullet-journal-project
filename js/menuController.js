import { verMaisNecessario } from "./notas.js";

//Seleciona as seções de cada tela/pagina
export const diarioPagina = document.querySelector(".diario");
const notasPagina = document.querySelector(".notas");

//Os itens do menu
const notaMenu = document.querySelector(".notas-menu");
const diarioMenu = document.querySelector(".diario-menu");

notasPagina.style.display = "none";

//Trocar a Aba
const selecaoMenu = document.querySelector(".selecao-menu");
diarioMenu.addEventListener("click", () => {
    diarioPagina.style.display = "block";
    notasPagina.style.display = "none";
    selecaoMenu.style.top = "-93px";
})
notaMenu.addEventListener("click", () => {
    diarioPagina.style.display = "none";
    notasPagina.style.display = "block";
    selecaoMenu.style.top = "-47px";
    verMaisNecessario()
});