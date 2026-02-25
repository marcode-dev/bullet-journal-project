import { criarElementos } from "./criarElementos.js";
import { criarNotas } from "./notas.js";
import { verMaisNecessario } from "./notas.js";

//Seleciona as seções de cada tela/pagina
export const diarioPagina = document.querySelector(".diario");
const notasPagina = document.querySelector(".notas");
const revisaoPagina = document.querySelector(".revisao");
const exportarPagina = document.querySelector(".exportar");

//Os itens do menu
const itensMenu = document.querySelectorAll(".option-menu")

const diarioMenu = document.querySelector(".diario-menu");
const notaMenu = document.querySelector(".notas-menu");
const revisaoMenu = document.querySelector(".revisao-menu");
const exportarMenu = document.querySelector(".exportar-menu");

notasPagina.style.display = "none";
revisaoPagina.style.display = "none";
exportarPagina.style.display = "none";

//Trocar a aba
itensMenu.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        itensMenu.forEach((a) => {
            a.classList.remove("selecao-menu")
        })

        if (elemento.classList.contains("diario-menu")) {
            mudarPagina("diario", diarioPagina);
            criarElementos()
            diarioMenu.classList.add("selecao-menu")
        } 
        else if (elemento.classList.contains("notas-menu")) {
            mudarPagina("notas", notasPagina);
            criarNotas()
            notaMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("revisao-menu")) {
            mudarPagina("revisao", revisaoPagina);
            revisaoMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("exportar-menu")) {
            mudarPagina("exportar", exportarPagina);
            exportarMenu.classList.add("selecao-menu")
        }
    })
})

function mudarPagina(pagina, mostrarPagina) {
    diarioPagina.style.display = "none";
    notasPagina.style.display = "none";
    revisaoPagina.style.display = "none";
    exportarPagina.style.display = "none";

    // Exibe a página; mantenha `flex` para a seção `.notas` (não sobrescrever CSS)
    if (mostrarPagina.classList.contains("notas")) {
        mostrarPagina.style.display = "flex";
    } else {
        mostrarPagina.style.display = "block";
    }
    sessionStorage.setItem("paginaAtual", pagina);
    if (pagina == "notas"){
        verMaisNecessario()
    }
}

function exibirPagina(){ //Se recarregar a página, exibe a última página visualizada, caso haja uma salva
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

    } else if (paginaSalva == "exportar"){
        mudarPagina(paginaSalva, exportarPagina)
        exportarMenu.classList.add("selecao-menu")
    }
}


exibirPagina()