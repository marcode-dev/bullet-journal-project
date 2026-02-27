//Cores post it: #27b3d9 #fca028 #f44072 #90cf4c #eee544

import { abrirModal } from "../../components/modal/modal.js";
import { idDia } from "../../utils/data.js";

//Cores post it text: #006681 #814900 #730020 #3a7000 #6b6500
const quadroNotas = document.querySelector(".campo-notas")
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let idsNotas = works.filter(a => a.tipo == "nota")
let filtrosCores = ["amarelo", "azul", "laranja", "vermelho", "verde"];


const selectTodos = document.getElementById("filtro-cor-todos");
selectTodos.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll('input[name="filtro-cor"]');
    if (selectTodos.checked) {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
        });
    } else {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
    // sempre que qualquer checkbox mudar, atualiza status de "todos" e armazenamento
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked == false) {
                selectTodos.checked = false;
            } else {
                const todos = Array.from(document.querySelectorAll('input[name="filtro-cor"]'))
                    .filter(c => c.value !== "todos");
                if (todos.every(c => c.checked)) {
                    selectTodos.checked = true;
                }
            }
            // depois da alteração, reflete no localStorage imediatamente
            updateStorageCores();
        })
    })
})

// helper para atualizar localStorage com as cores selecionadas atuais
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

let tamanhoSelecionado = "null";

const aplicarFiltros = document.querySelector(".aplicar-filtros-notas");
aplicarFiltros.addEventListener("click", (e) => {
    e.preventDefault(); // evita que o botão dentro do form submeta a página
    idsNotas = works.filter(a => a.tipo == "nota")
    const orderNotas = document.getElementById("ordenar-notas").value;
    if (orderNotas == "recentes") {
        idsNotas.sort((a, b) => b.idElemento - a.idElemento); // Ordena do mais recente para o mais antigo
        console.log("Filtro aplicado: Notas mais recentes");
    } else if (orderNotas == "antigos") {
        idsNotas.sort((a, b) => a.idElemento - b.idElemento); // Ordena do mais antigo para o mais recente
        console.log("Filtro aplicado: Notas mais antigas");
    }

    const orderData = document.getElementById("order-data").value;

    const ano = idDia.slice(0, 4);
    const mes = idDia.slice(4, 6) - 1;
    const dia = idDia.slice(6, 8);

    const data = new Date(ano, mes, dia);

    if (orderData == "hoje") {
        idsNotas = idsNotas.filter(a => a.idDia == idDia);
        console.log("Filtro aplicado: Notas de hoje");
    } else if (orderData == "semana") {
        const ultimaSemana = new Date(data);
        ultimaSemana.setDate(data.getDate() - 7);
        idsNotas = idsNotas.filter(a => a.idDia >= ultimaSemana.toISOString().slice(0, 10).replace(/-/g, ""));
        console.log("Filtro aplicado: Notas da última semana");
    } else if (orderData == "mes") {
        const ultimoMes = new Date(data);
        ultimoMes.setMonth(data.getMonth() - 1);
        idsNotas = idsNotas.filter(a => a.idDia >= ultimoMes.toISOString().slice(0, 10).replace(/-/g, ""));
        console.log("Filtro aplicado: Notas do último mês");
    }

    const tamanhoNota = document.querySelector('input[name="tamanho-nota"]:checked');
    if (tamanhoNota == null) {
        console.log("Nenhum filtro de tamanho aplicado");
    } else {
        localStorage.setItem("tamanhoNota", tamanhoNota.value);
        console.log("Filtro aplicado: Tamanho da nota - " + tamanhoNota.value);
    }

    let coresSelecionadas = [];
    document.querySelectorAll('input[name="filtro-cor"]:checked').forEach((checkbox) => {
        coresSelecionadas.push(checkbox.value);
    });
    if (coresSelecionadas.length > 0) {
        if (coresSelecionadas.includes("todos")) {
            coresSelecionadas = ["amarelo", "azul", "laranja", "vermelho", "verde"];
        }
        idsNotas = idsNotas.filter(a => coresSelecionadas.includes(a.cor));
        console.log("Filtro aplicado: Cores - " + coresSelecionadas.join(", "));
        localStorage.setItem("filtrosCores", JSON.stringify(coresSelecionadas));
    } else {
        // nenhum filtro selecionado: remover entrada para voltar ao padrão
        localStorage.removeItem("filtrosCores");
        console.log("Nenhum filtro de cor aplicado - armazenamento limpo");
    }
    criarNotas();


    console.log("Notas Filtradas: ", idsNotas)
});

const mapaCores = {
    amarelo: "#eee544",
    azul: "#27b3d9",
    laranja: "#fca028",
    vermelho: "#f44072",
    verde: "#90cf4c"
};

let selectCor;
let editarNotas;
let apagarNotas;

export function detectarCor(cor) {
    if (cor == "amarelo") { return "#eee544" }
    else if (cor == "verde") { return "#90cf4c" }
    else if (cor == "vermelho") { return "#f44072" }
    else if (cor == "laranja") { return "#fca028" }
    else if (cor == "azul") { return "#27b3d9" }
}
export function detectarCorTexto(cor) {
    if (cor == "amarelo") { return "texto-escuro" }
    else if (cor == "verde") { return "texto-escuro" }
    else if (cor == "vermelho") { return "texto-claro" }
    else if (cor == "laranja") { return "texto-claro" }
    else if (cor == "azul") { return "texto-claro" }
}

function semNotas() {
    console.log("Verificando notas existentes, mas nenhuma encontrada");
    if (document.querySelector(".sem-notas")) return; // evita criar múltiplas mensagens se já existir
    const semNotas = document.createElement("p");
    semNotas.classList.add("sem-notas");
    semNotas.textContent = "Nenhuma nota encontrada :D";
    quadroNotas.appendChild(semNotas);
}

console.log(idsNotas, ": IDs notas")
export function criarNotas() {
    document.querySelectorAll(".campo-notas > div").forEach(a => { a.remove() })
    document.querySelectorAll(".sem-notas").forEach(a => a.remove())
    if (!idsNotas || idsNotas.length == 0) {
        semNotas();
        return;
    }
    for (let i in idsNotas) {
        const postIt = document.createElement("div")
        postIt.classList.add("post-it")
        postIt.dataset.idElemento = idsNotas[i].idElemento;
        postIt.style.backgroundColor = idsNotas[i].cor;

        const textoNota = document.createElement("p")
        textoNota.classList.add("pNota")
        textoNota.textContent = idsNotas[i].conteudo;

        const conteudoNota = document.createElement("div")
        conteudoNota.classList.add("conteudo-nota")
        conteudoNota.appendChild(textoNota)

        const corBonita = document.createElement("select")
        corBonita.classList.add("cor-select")
        corBonita.innerHTML = `
            <option value="amarelo">🟡</option>
            <option value="azul">🔵</option>
            <option value="laranja">🟠</option>
            <option value="vermelho">🔴</option>
            <option value="verde">🟢</option>
        `;

        const editar = document.createElement("img")
        editar.classList.add("editar-nota")
        editar.src = "https://images.icon-icons.com/3862/PNG/512/edit_icon_240853.png"
        editar.title = "Editar"

        const apagar = document.createElement("img")
        apagar.classList.add("apagar-nota")
        apagar.src = "https://cdn-icons-png.freepik.com/512/17/17167.png"
        apagar.title = "Apagar"

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");
        acoes.appendChild(editar)
        acoes.appendChild(apagar)
        acoes.appendChild(corBonita)

        let ind;
        if (idsNotas[i].cor == "amarelo") { ind = 0 }
        else if (idsNotas[i].cor == "azul") { ind = 1 }
        else if (idsNotas[i].cor == "laranja") { ind = 2 }
        else if (idsNotas[i].cor == "vermelho") { ind = 3 }
        else if (idsNotas[i].cor == "verde") { ind = 4 }

        corBonita.selectedIndex = ind;
        const corInicial = idsNotas[i].cor;

        corBonita.style.backgroundImage = `
            radial-gradient(circle at 16px center, ${mapaCores[corInicial]} 8px, transparent 9px),
            url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")
        `;
        postIt.style.backgroundColor = detectarCor(idsNotas[i].cor);
        postIt.classList.add(detectarCorTexto(idsNotas[i].cor));

        postIt.appendChild(conteudoNota);
        postIt.appendChild(acoes);
        quadroNotas.appendChild(postIt);

        tamanhoSelecionado = localStorage.getItem("tamanhoNota") || "media";
        if (tamanhoSelecionado === "pequena") {
            postIt.style.width = "150px";
            postIt.style.height = "150px";
            textoNota.style.fontSize = "13px";
            editar.style.width = "15px";
            editar.style.height = "15px";
            apagar.style.width = "15px";
            apagar.style.height = "15px";
        }
        else if (tamanhoSelecionado === "media") {
            console.log("Tamanho padrão aplicado");
        }
        else if (tamanhoSelecionado === "grande") {
            postIt.style.width = "300px";
            postIt.style.height = "300px";
        }
    }
    selectCor = document.querySelectorAll(".cor-select")
    editarNotas = document.querySelectorAll(".editar-nota")
    apagarNotas = document.querySelectorAll(".apagar-nota")

    atualizarCores(); // Adicionar os listener de cor
    editarNota(); // Adicionar os listener de edição
    apagarNota(); // Adicionar os listener de deleção
    verMaisNecessario(); // Verificar se o "ver mais" é necessário e adicionar os listener de ver mais
}
criarNotas();

function atualizarCores() {
    selectCor.forEach((selecionado) => {
        selecionado.addEventListener("change", (event) => {
            let index = works.findIndex(a => a.idElemento == event.target.parentNode.parentNode.dataset.idElemento)
            let cor = event.target.value;

            event.target.style.backgroundImage = `
                radial-gradient(circle at 16px center, ${mapaCores[cor]} 8px, transparent 9px),
                url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")
            `;

            event.target.parentNode.parentNode.style.backgroundColor = detectarCor(cor);

            event.target.parentNode.parentNode.classList.remove("texto-claro", "texto-escuro");
            event.target.parentNode.parentNode.classList.add(detectarCorTexto(cor));
            console.log(detectarCorTexto(cor))

            works[index].cor = cor;
            console.log(works[index].idElemento + ": Cor alterada para " + works[index].cor);

            localStorage.setItem("tarefas", JSON.stringify(works))

            criarNotas();

            /*
            Cores post it: #27b3d9 #fca028 #f44072 #90cf4c #eee544
            Cores post it text: #006681 #814900 #730020 #3a7000 #6b6500
            */
        })
    })
}

function editarNota() {
    editarNotas.forEach((a) => {
        a.addEventListener("click", (event) => {
            let idDoElemento = event.target.closest(".post-it").dataset.idElemento;
            let index = works.findIndex(a => a.idElemento == idDoElemento)

            let tituloModal = `Editar Nota`;
            let conteudoModal = `
            <textarea type="text" class="editar-tarefas" wrap="hard" rows="5"
                cols="10" autofocus>${works[index].conteudo}</textarea>
            `;
            abrirModal(tituloModal, conteudoModal, works[index].idElemento, "editar")
        })
    })
}

function apagarNota() {
    apagarNotas.forEach((a) => {
        a.addEventListener("click", (event) => {
            let idDoElemento = event.target.closest(".post-it").dataset.idElemento;
            let index = works.findIndex(a => a.idElemento == idDoElemento)

            let tituloModal = `Excluir Nota?`;
            let conteudoModal = `<p>Você tem certeza que deseja excluir esta nota?</p>`;
            abrirModal(tituloModal, conteudoModal, works[index].idElemento, "excluir-nota")
        })
    })
}

export function verMaisNecessario() {
    selectCor.forEach((a) => {
        const postIt = a.closest(".post-it");
        if (!postIt) return;
        const conteudoNota = postIt.querySelector(".conteudo-nota");
        if (!conteudoNota) return;
        let verMais = postIt.querySelector(".ver-mais");
        if (!verMais) {
            verMais = document.createElement("h3");
            verMais.classList.add("ver-mais");
            verMais.textContent = "...Ver Mais";

            tamanhoSelecionado = localStorage.getItem("tamanhoNota") || "media";
            if (tamanhoSelecionado === "pequena") {
                verMais.style.fontSize = "10px";
            } else if (tamanhoSelecionado === "media") {
                verMais.style.fontSize = "12px";
            }
            postIt.appendChild(verMais);
            verMais.addEventListener("click", (e) => {
                let idDoElemento = e.target.parentNode.dataset.idElemento;
                let index = works.findIndex(a => a.idElemento == idDoElemento)

                let tituloModal = `Ver Mais`;
                let conteudoModal = `
                    <p class="modal-quebra">${works[index].conteudo}</p>
                `;
                abrirModal(tituloModal, conteudoModal, works[index].idElemento, "ver-mais")
            })
        }

        if (conteudoNota.scrollHeight > conteudoNota.clientHeight) {
            verMais.style.display = "block";
        } else {
            verMais.style.display = "none";
        }
    })
}

const filtrarIcon = document.querySelector(".filtrar-ocultar-icon");
const filtrarCampo = document.querySelector(".painel-filtros");
verificarEstadoFiltros();
filtrarIcon.addEventListener("click", () => {
    if (filtrarCampo.style.display == "block") {
        sessionStorage.setItem("filtrosNotas", "fechado")
        verificarEstadoFiltros();
    } else {
        sessionStorage.setItem("filtrosNotas", "aberto")
        verificarEstadoFiltros();
    }
})

function verificarEstadoFiltros() {
    if (sessionStorage.getItem("filtrosNotas") == "aberto") {
        filtrarCampo.style.display = "block";
        filtrarCampo.style.pointerEvents = "auto";
        filtrarIcon.style.opacity = "1";

        const tamanhoNota = document.querySelectorAll('input[name="tamanho-nota"]');
        tamanhoNota.forEach((input) => {
            if (input.value == localStorage.getItem("tamanhoNota")) {
                input.checked = true;
            }
        })
        const filtrosCores = JSON.parse(localStorage.getItem("filtrosCores"));
        if (filtrosCores && filtrosCores.length > 0) {
            document.querySelectorAll('input[name="filtro-cor"]').forEach((checkbox) => {
                if (filtrosCores.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
            // se o array salvo contém todas as cores básicas, mesmo sem guardar "todos",
            // garantir que o checkbox de "todos" apareça selecionado
            const todasAsCores = ["amarelo", "azul", "laranja", "vermelho", "verde"];
            if (!filtrosCores.includes("todos") &&
                todasAsCores.every(c => filtrosCores.includes(c))) {
                selectTodos.checked = true;
            }
        }
    } else {
        filtrarCampo.style.display = "none";
        filtrarIcon.style.opacity = "0.7";
    }
}
