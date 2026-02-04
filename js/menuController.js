import { verMaisNecessario } from "./notas.js";

//Seleciona as seções de cada tela/pagina
export const diarioPagina = document.querySelector(".diario");
const notasPagina = document.querySelector(".notas");
const revisaoPagina = document.querySelector(".revisao");

//Os itens do menu
const itensMenu = document.querySelectorAll(".option-menu")

const diarioMenu = document.querySelector(".diario-menu");
const notaMenu = document.querySelector(".notas-menu");
const revisaoMenu = document.querySelector(".revisao-menu");

notasPagina.style.display = "none";

//Trocar a aba
itensMenu.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        itensMenu.forEach((a) => {
            a.classList.remove("selecao-menu")
        })

        if (elemento.classList.contains("diario-menu")) {
            mudarPagina("diario", diarioPagina);
            diarioMenu.classList.add("selecao-menu")
        } 
        else if (elemento.classList.contains("notas-menu")) {
            mudarPagina("notas", notasPagina);
            notaMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("revisao-menu")) {
            mudarPagina("revisao", revisaoPagina);
            revisaoMenu.classList.add("selecao-menu")
        }
    })
})

function mudarPagina(pagina, mostrarPagina) {
    diarioPagina.style.display = "none";
    notasPagina.style.display = "none";
    revisaoPagina.style.display = "none";

    mostrarPagina.style.display = "block";
    sessionStorage.setItem("paginaAtual", pagina);
    if (pagina == "notas"){
        verMaisNecessario()
    }
}

function exibirPagina(){ //Se recarregada...
    const paginaSalva = sessionStorage.getItem("paginaAtual")

    if (paginaSalva == "notas"){
        mudarPagina(paginaSalva, notasPagina)
        notaMenu.classList.add("selecao-menu")
    } else if (paginaSalva == "revisao") {
        mudarPagina(paginaSalva, revisaoPagina)
        revisaoMenu.classList.add("selecao-menu")
    } else if (paginaSalva == "diario"){
        mudarPagina(paginaSalva, diarioPagina)
        diarioMenu.classList.add("selecao-menu")
    }
}

exibirPagina()