//Cores post it: #27b3d9 #fca028 #f44072 #90cf4c #eee544

import { abrirModal } from "../../components/modal/modal.js";

//Cores post it text: #006681 #814900 #730020 #3a7000 #6b6500
const quadroNotas = document.querySelector(".campo-notas")
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let idsNotas = works.filter(a => a.tipo == "nota")

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
    const semNotas = document.createElement("p");
    semNotas.textContent = "Nenhuma nota criada ainda :D";
    quadroNotas.appendChild(semNotas);
}

console.log(idsNotas, ": IDs notas")
export function criarNotas() {
    document.querySelectorAll(".campo-notas > div").forEach(a => { a.remove() })
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
        postIt.style.backgroundColor = detectarCor(idsNotas[i].cor);
        postIt.classList.add(detectarCorTexto(idsNotas[i].cor));

        postIt.appendChild(conteudoNota);
        postIt.appendChild(acoes);
        quadroNotas.appendChild(postIt);
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
