import { criarNotas} from "../notas/notes.js"

adicionarListenersCheckboxes();

// Função para sincronizar o status do "Todos" baseado nos checkboxes individuais
function sincronizarCheckboxTodos() {
    const checkboxesIndividuais = Array.from(document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)'));
    const todosMarcados = checkboxesIndividuais.every(c => c.checked);
    const nenhumMarcado = checkboxesIndividuais.every(c => !c.checked);
    
    selectTodos.checked = todosMarcados;
    selectTodos.indeterminate = !todosMarcados && !nenhumMarcado;
}

// Adicionar listeners aos checkboxes individuais
export function adicionarListenersCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            // Sincroniza o checkbox "Todos"
            sincronizarCheckboxTodos();
            // Atualiza localStorage imediatamente
            updateStorageCores();
        });
    });
}

const selectTodos = document.getElementById("filtro-cor-todos");
selectTodos.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll('input[name="filtro-cor"]:not(#filtro-cor-todos)');
    if (selectTodos.checked) {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
        });
    } else {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
    // Atualiza localStorage
    updateStorageCores();
})

function updateStorageCores() {
    let coresSelecion = [];
    document.querySelectorAll('input[name="filtro-cor"]:checked').forEach(c => coresSelecion.push(c.value));
    if (coresSelecion.length === 0) {
        localStorage.removeItem("filtrosCores");
    } else {
        if (coresSelecion.includes("todos")) {
            coresSelecion = ["amarelo", "azul", "laranja", "vermelho", "verde"];
        }
        localStorage.setItem("filtrosCores", JSON.stringify(coresSelecion));
    }
}

// Carregar e aplicar filtros salvos ao iniciar
function carregarFiltrosSalvos() {
    // Marca os checkboxes de tamanho
    const tamanhoNota = document.querySelectorAll('input[name="tamanho-nota"]');
    tamanhoNota.forEach((input) => {
        if (input.value == localStorage.getItem("tamanhoNota")) {
            input.checked = true;
        }
    })

    // Marca os checkboxes de cor
    const filtrosCores = JSON.parse(localStorage.getItem("filtrosCores"));
    if (filtrosCores && filtrosCores.length > 0) {
        document.querySelectorAll('input[name="filtro-cor"]').forEach((checkbox) => {
            if (filtrosCores.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
        
        // Sincroniza o checkbox "Todos" com base nos checkboxes individuais
        sincronizarCheckboxTodos();

        // AQUI: Reaplica os filtros de cor ao carregar a página
        let works = JSON.parse(localStorage.getItem("tarefas")) || [];
        let notasFiltradas = works.filter(a => a.tipo == "nota" && filtrosCores.includes(a.cor));
        criarNotas(notasFiltradas);
    } else {
        // Se não há filtros salvos, exibe todas as notas
        criarNotas();
    }
}

carregarFiltrosSalvos();

const filtrarIcon = document.querySelector(".filtrar-ocultar-icon");
const filtrarCampo = document.querySelector(".painel-filtros");

verificarEstadoFiltros();
filtrarIcon.addEventListener("click", () => {
    if (filtrarCampo.style.display == "block") {
        sessionStorage.setItem("filtrosNotas", "fechado")
    } else {
        sessionStorage.setItem("filtrosNotas", "aberto")
    }
    verificarEstadoFiltros();
})

function verificarEstadoFiltros() {
    if (sessionStorage.getItem("filtrosNotas") == "aberto") {
        filtrarCampo.style.display = "block";
        filtrarCampo.style.pointerEvents = "auto";
        filtrarIcon.style.opacity = "1";
        quadroNotas.style.border = "1px solid var(--cor-escura)";
    } else {
        filtrarCampo.style.display = "none";
        filtrarIcon.style.opacity = "0.7";
    }
}
