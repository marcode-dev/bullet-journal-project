import { criarElementos } from "../../pages/dashboard/criarElementos.js";
import { adiados } from "../../pages/dashboard/delayedTasks.js";
import { criarNotas, detectarCor, detectarCorTexto } from "../../pages/dashboard/notas/notes.js";

const modal = document.querySelector(".modal");
const tituloModal = document.querySelector(".titulo-modal");
const conteudoModal = document.querySelector(".modal-conteudo");
const fechar = document.querySelector(".fechar-modal");
const salvar = document.querySelector(".salvar");

const fade = document.querySelector(".fade");
const body = document.querySelector("body");

let works = JSON.parse(localStorage.getItem("tarefas"));

// Sair do modal - Ou pelo esc, ou pelo clique no fade
fade.addEventListener("click", fecharModal)
body.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fecharModal();
    }
})
fechar.addEventListener("click", fecharModal)

export function abrirModal(titulo, conteudo, idElemento, acao) {
    console.log("Modal aberto: " + idElemento)
    const postIts = document.querySelector(".postItTop")
    if (postIts) {
        postIts.classList.remove("postItTop")
    }
    fade.style.display = "block";
    modal.style.display = "block";
    salvar.style.display = "block";
    body.style.overflow = "hidden";

    tituloModal.textContent = titulo;
    conteudoModal.innerHTML = conteudo;
    
    if (acao == "editar") { //-------------------------------------EDITAR
        works = JSON.parse(localStorage.getItem("tarefas"));
        salvar.textContent = "Salvar";
        let editarTarefa = document.querySelector(".editar-tarefas");
        editarTarefa.focus()
        salvar.onclick = () => {
            let index = works.findIndex(a => a.idElemento == idElemento)
            works[index].conteudo = `${editarTarefa.value}`;
            localStorage.setItem("tarefas", JSON.stringify(works))
            fecharModal()
            criarElementos()
            criarNotas()
        }
    } else if (acao == "excluir") {//-------------------------------- EXCLUIR
        works = JSON.parse(localStorage.getItem("tarefas"));
        salvar.textContent = "Excluir";
        salvar.onclick = () => {
            console.log(idElemento + ": Excluido")
            let index = works.findIndex(d => d.idElemento === idElemento)
            if (index >= 0) {
                works.splice(index, 1)
                localStorage.setItem("tarefas", JSON.stringify(works))

                let indexAdiado = adiados.findIndex(d => d.idElemento === idElemento)
                if (indexAdiado >= 0) {
                    adiados.splice(indexAdiado, 1)
                    localStorage.setItem("Adiados", JSON.stringify(adiados))
                }
            }
            fecharModal()
            criarElementos()
        }
    } else if (acao == "ver-mais") {//------------------------------ VER MAIS(notas)
        works = JSON.parse(localStorage.getItem("tarefas"));
        salvar.style.display = "none";
        let index = works.findIndex(a => a.idElemento == idElemento)
        let cor = detectarCor(works[index].cor) || "#eee544";
        let corTexto = detectarCorTexto(works[index].cor) || "#6b6500";
        modal.style.backgroundColor = cor;
        modal.style.color = corTexto;
        modal.classList.add("postItTop")

    } else if (acao == "editar-nota") {//---------------------------- EDITAR NOTA
        works = JSON.parse(localStorage.getItem("tarefas"));
        salvar.textContent = "Salvar";
        let editarTarefa = document.querySelector(".editar-tarefas");
        editarTarefa.focus()
        salvar.onclick = () => {
            let index = works.findIndex(a => a.idElemento == idElemento)
            works[index].conteudo = `${editarTarefa.value}`;
            localStorage.setItem("tarefas", JSON.stringify(works))
            fecharModal()
            criarNotas()
        }
    } else if (acao == "excluir-nota") {
        works = JSON.parse(localStorage.getItem("tarefas"));
        salvar.textContent = "Excluir";
        salvar.onclick = () => {
            console.log(idElemento + ": Nota Excluida")
            let index = works.findIndex(d => d.idElemento === idElemento)
            if (index >= 0) {
                works.splice(index, 1)
                localStorage.setItem("tarefas", JSON.stringify(works))
            }
            criarNotas()
            fecharModal()
        }
    } else if (acao == "confirmar") {
        salvar.textContent = "Confirmar";
        salvar.onclick = () => {
            if (typeof idElemento === "function") {
                idElemento(); // executa o callback
            }
            fecharModal()
        }
    } else {
        salvar.style.display = "none";
    }

}
function fecharModal() {
    fade.style.display = "none"
    modal.style.display = "none"
    modal.style.backgroundColor = "white"
    modal.style.color = "black"
    modal.classList.remove("postItTop")
    body.style.overflow = "visible"
}