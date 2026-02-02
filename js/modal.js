import { criarElementos } from "./criarElementos.js";
import { adiados } from "./tarefasAdiadas.js";
import { detectarCor } from "./notas.js";

const modal = document.querySelector(".modal");
const tituloModal = document.querySelector(".titulo-modal");
const conteudoModal = document.querySelector(".modal-conteudo");
const fechar = document.querySelector(".fechar-modal");
const salvar = document.querySelector(".salvar");

const fade = document.querySelector(".fade");
const body = document.querySelector("body");

let works = JSON.parse(localStorage.getItem("tarefas"));

fade.addEventListener("click", fecharModal)
fechar.addEventListener("click", fecharModal)

export function abrirModal(titulo, conteudo, idElemento, acao) {
    console.log(idElemento)
    const postIts = document.querySelector(".postItTop")
    if (postIts){
        postIts.classList.remove("postItTop")
    }
    fade.style.display = "block";
    modal.style.display = "block";
    salvar.style.display = "block";
    body.style.overflow = "hidden";

    tituloModal.textContent = titulo;
    conteudoModal.innerHTML = conteudo;
    if (acao == "editar") {
        salvar.textContent = "Salvar";
        let editarTarefa = document.querySelector(".editar-tarefas");
        editarTarefa.focus()
        salvar.onclick = () => {
            let index = works.findIndex(a => a.idElemento == idElemento)
            works[index].conteudo = `${editarTarefa.value}`;
            localStorage.setItem("tarefas", JSON.stringify(works))
            fecharModal()
            criarElementos()
        }
    } else if (acao == "excluir") {
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
    } else if (acao == "ver-mais") {
        salvar.style.display = "none";
        /*
        let index = works.findIndex(a => a.idElemento == idElemento)
        let cor = detectarCor(works[index].cor) || "#eee544";
        modal.style.backgroundColor = cor;
        modal.classList.add("postItTop")
        */
    }

}
function fecharModal() {
    fade.style.display = "none"
    modal.style.display = "none"
    body.style.overflow = "visible"
}