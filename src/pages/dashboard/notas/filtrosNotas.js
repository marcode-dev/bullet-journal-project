import { criarNotas } from "../notas/notes.js"
import { idDia } from "../../../utils/data.js"

// ─── Função central de filtragem (usada pelo botão e pelos listeners instantâneos) ───
function aplicarFiltrosInstantaneo() {
    let works = JSON.parse(localStorage.getItem("tarefas")) || [];
    let idsNotas = works.filter(a => a.tipo == "nota");

    // Ordenação
    const orderNotas = document.getElementById("ordenar-notas").value;
    if (orderNotas == "recentes") {
        idsNotas.sort((a, b) => b.idElemento - a.idElemento);
    } else if (orderNotas == "antigos") {
        idsNotas.sort((a, b) => a.idElemento - b.idElemento);
    }

    // Filtro de data
    const orderData = document.getElementById("order-data").value;
    const ano = idDia.slice(0, 4);
    const mes = idDia.slice(4, 6) - 1;
    const dia = idDia.slice(6, 8);
    const data = new Date(ano, mes, dia);

    if (orderData == "hoje") {
        idsNotas = idsNotas.filter(a => a.idDia == idDia);
    } else if (orderData == "semana") {
        const ultimaSemana = new Date(data);
        ultimaSemana.setDate(data.getDate() - 7);
        idsNotas = idsNotas.filter(a => a.idDia >= ultimaSemana.toISOString().slice(0, 10).replace(/-/g, ""));
    } else if (orderData == "mes") {
        const ultimoMes = new Date(data);
        ultimoMes.setMonth(data.getMonth() - 1);
        idsNotas = idsNotas.filter(a => a.idDia >= ultimoMes.toISOString().slice(0, 10).replace(/-/g, ""));
    }

    // Filtro de tamanho
    const tamanhoNota = document.querySelector('input[name="tamanho-nota"]:checked');
    if (tamanhoNota) {
        localStorage.setItem("tamanhoNota", tamanhoNota.value);
    }

    // Filtro de cores
    let coresSelecionadas = [];
    document.querySelectorAll('input[name="filtro-cor"]:checked').forEach((checkbox) => {
        coresSelecionadas.push(checkbox.value);
    });
    if (coresSelecionadas.length > 0) {
        if (coresSelecionadas.includes("todos")) {
            coresSelecionadas = ["amarelo", "azul", "laranja", "vermelho", "verde"];
        }
        idsNotas = idsNotas.filter(a => coresSelecionadas.includes(a.cor));
        localStorage.setItem("filtrosCores", JSON.stringify(coresSelecionadas));
    } else {
        localStorage.removeItem("filtrosCores");
    }

    criarNotas(idsNotas);
}

// ─── Sincronizar checkbox "Todos" ───
function sincronizarCheckboxTodos() {
    const checkboxesIndividuais = Array.from(document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)'));
    const todosMarcados = checkboxesIndividuais.every(c => c.checked);
    const nenhumMarcado = checkboxesIndividuais.every(c => !c.checked);
    selectTodos.checked = todosMarcados;
    selectTodos.indeterminate = !todosMarcados && !nenhumMarcado;
}

// ─── Listeners de cores (instantâneos) ───
export function adicionarListenersCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            sincronizarCheckboxTodos();
            aplicarFiltrosInstantaneo();
        });
    });
}

const selectTodos = document.getElementById("filtro-cor-todos");
selectTodos.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectTodos.checked;
    });
    aplicarFiltrosInstantaneo();
});

// ─── Listeners de ordenação e data (instantâneos) ───
document.getElementById("ordenar-notas").addEventListener("change", aplicarFiltrosInstantaneo);
document.getElementById("order-data").addEventListener("change", aplicarFiltrosInstantaneo);

// ─── Listeners de tamanho (instantâneos) ───
document.querySelectorAll('input[name="tamanho-nota"]').forEach((radio) => {
    radio.addEventListener("change", aplicarFiltrosInstantaneo);
});

// ─── Botão Filtrar (mantido para compatibilidade) ───
const aplicarFiltros = document.querySelector(".aplicar-filtros-notas");
if (aplicarFiltros) {
    aplicarFiltros.addEventListener("click", (e) => {
        e.preventDefault();
        aplicarFiltrosInstantaneo();
    });
}

// ─── Carregar filtros salvos ao iniciar ───
function carregarFiltrosSalvos() {
    // Restaura tamanho
    const tamanhoSalvo = localStorage.getItem("tamanhoNota");
    if (tamanhoSalvo) {
        document.querySelectorAll('input[name="tamanho-nota"]').forEach((input) => {
            if (input.value == tamanhoSalvo) input.checked = true;
        });
    }

    // Restaura cores
    const filtrosCores = JSON.parse(localStorage.getItem("filtrosCores"));
    if (filtrosCores && filtrosCores.length > 0) {
        document.querySelectorAll('input[name="filtro-cor"]').forEach((checkbox) => {
            if (filtrosCores.includes(checkbox.value)) checkbox.checked = true;
        });
        sincronizarCheckboxTodos();
    }

    // Aplicar filtros salvos
    aplicarFiltrosInstantaneo();
}

adicionarListenersCheckboxes();
carregarFiltrosSalvos();