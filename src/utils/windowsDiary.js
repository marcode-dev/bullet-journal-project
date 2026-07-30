const tabs = document.querySelectorAll(".windows > *");

export const todosTab = document.querySelector(".todos-tab");
const pendentesTab = document.querySelector(".pendentes-tab");
const adiadasTab = document.querySelector(".adiadas-tab");
const finalizadasTab = document.querySelector(".finalizadas-tab");
const canceladasTab = document.querySelector(".canceladas-tab");
const notasTab = document.querySelector(".notas-tab");

const tarefas = document.querySelector(".tarefas-criadas");
const adiadas = document.querySelector(".tarefas-adiadas");
const finalizadas = document.querySelector(".tarefas-finalizadas");
const canceladas = document.querySelector(".tarefas-canceladas");
const notas = document.querySelector(".tarefas-notas");

showTab(todosTab, "todos")

todosTab.addEventListener("click", () => { showTab(todosTab, "todos") })
pendentesTab.addEventListener("click", () => { showTab(pendentesTab, tarefas) })
adiadasTab.addEventListener("click", () => { showTab(adiadasTab, adiadas) })
finalizadasTab.addEventListener("click", () => { showTab(finalizadasTab, finalizadas) })
canceladasTab.addEventListener("click", () => { showTab(canceladasTab, canceladas) })
notasTab.addEventListener("click", () => { showTab(notasTab, notas) })

export function showTab(tab, content) {
    tarefas.style.display = "none";
    adiadas.style.display = "none";
    finalizadas.style.display = "none";
    canceladas.style.display = "none";
    notas.style.display = "none";

    tabs.forEach(tab => tab.classList.remove("tab-selecionada"));

    tab.classList.add("tab-selecionada")

    if (content == "todos") {
        tarefas.style.display = "block";
        adiadas.style.display = "block";
        finalizadas.style.display = "block";
        canceladas.style.display = "block";
        notas.style.display = "block";
    } else {
        content.style.display = "block"
    }

}


/*
    Adicionar contadores: Pendentes (10)
    Tirar o fundo diferente de adiadas
    Ícones aparecer apenas no hover
    barra marrom com utilidade: + Nova tarefa        Pesquisar      Ordenar
    permitir recolher a sidebar
*/