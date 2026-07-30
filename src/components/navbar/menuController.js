import { criarElementos } from "../../pages/dashboard/criarElementos.js";
import { criarNotas } from "../../pages/dashboard/notas/notes.js";
import { verMaisNecessario } from "../../pages/dashboard/notas/notes.js";
import { aplicarDarkMode } from "../../utils/darkMode.js";
import { showTab, todosTab } from "../../utils/windowsDiary.js";

//Seleciona as seções de cada tela/pagina
export const diarioPagina = document.querySelector(".diario");
const notasPagina = document.querySelector(".notas");
const sobrePagina = document.querySelector(".sobre");
const exportarPagina = document.querySelector(".exportar");

//Os itens do menu
const itensMenu = document.querySelectorAll(".option-menu")

const diarioMenu = document.querySelector(".diario-menu");
const notaMenu = document.querySelector(".notas-menu");
const sobreMenu = document.querySelector(".sobre-menu");
const exportarMenu = document.querySelector(".exportar-menu");

notasPagina.style.display = "none";
sobrePagina.style.display = "none";
exportarPagina.style.display = "none";

//Trocar a aba
itensMenu.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        itensMenu.forEach((a) => {
            a.classList.remove("selecao-menu")
        })
        aplicarDarkMode();

        if (elemento.classList.contains("diario-menu")) {
            mudarPagina("diario", diarioPagina);
            criarElementos()
            showTab(todosTab, "todos")
            diarioMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("notas-menu")) {
            mudarPagina("notas", notasPagina);
            criarNotas()
            notaMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("sobre-menu")) {
            mudarPagina("sobre", sobrePagina);
            sobreMenu.classList.add("selecao-menu")
        }
        else if (elemento.classList.contains("exportar-menu")) {
            mudarPagina("exportar", exportarPagina);
            exportarMenu.classList.add("selecao-menu")
        }
    })
})

export function mudarPagina(pagina, mostrarPagina) {
    diarioPagina.style.display = "none";
    notasPagina.style.display = "none";
    sobrePagina.style.display = "none";
    exportarPagina.style.display = "none";

    // Exibe a página; mantenha `flex` para a seção `.notas` (não sobrescrever CSS)
    if (mostrarPagina.classList.contains("notas")) {
        mostrarPagina.style.display = "flex";
    } else {
        mostrarPagina.style.display = "block";
    }
    sessionStorage.setItem("paginaAtual", pagina);
    if (pagina == "notas") {
        verMaisNecessario()
    }
}

function exibirPagina() { //Se recarregar a página, exibe a última página visualizada, caso haja uma salva
    const paginaSalva = sessionStorage.getItem("paginaAtual")

    if (paginaSalva == "notas") {
        mudarPagina(paginaSalva, notasPagina)
        notaMenu.classList.add("selecao-menu")

    } else if (paginaSalva == "sobre") {
        mudarPagina(paginaSalva, sobrePagina)
        sobreMenu.classList.add("selecao-menu")

    } else if (paginaSalva == "diario") {
        mudarPagina(paginaSalva, diarioPagina)
        diarioMenu.classList.add("selecao-menu")

    } else if (paginaSalva == "exportar") {
        mudarPagina(paginaSalva, exportarPagina)
        exportarMenu.classList.add("selecao-menu")
    }
}

exibirPagina()

const markitLogo = document.querySelector(".logo-header")

markitLogo.addEventListener("click", () => {
    itensMenu.forEach((a) => {
        a.classList.remove("selecao-menu")
    })
    mudarPagina("diario", diarioPagina)
    diarioMenu.classList.add("selecao-menu")
})