//Mudar estilo da tarefa de acordo com o status da mesma
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let adiados = JSON.parse(localStorage.getItem("Adiados")) || [];
import { criarElementos } from "./criarElementos.js";
import { verificarTarefas } from "./criarElementos.js";

// import { selectType } from "./main.js";
// console.log("teste")
const tarefasCriadas = document.querySelector(".tarefas-criadas")
tarefasCriadas.addEventListener("change", (event) => {
    alterarStatus(event);
})
const tarefasAdiadas = document.querySelector(".tarefas-adiadas")
tarefasAdiadas.addEventListener("change", (event) => {
    alterarStatus(event);
})
const tarefasFinalizadas = document.querySelector(".tarefas-finalizadas")
tarefasFinalizadas.addEventListener("change", (event) => {
    alterarStatus(event);
})
const tarefasCanceladas = document.querySelector(".tarefas-canceladas")
tarefasCanceladas.addEventListener("change", (event) => {
    alterarStatus(event);
})

function alterarStatus(event) {
    if (!event.target.classList.contains("tipo2")) return;

    //normal, adiada, cancelar, finalizada
    let chamada = event.target;
    let tarefaDivEl = chamada.parentNode.parentNode;

    const dataIdElemento = tarefaDivEl.dataset.idElemento;
    if (!dataIdElemento) return;

    let index = works.findIndex(a => a.idElemento == dataIdElemento)
    if (index < 0) return;

    let status;
    if (chamada.value == "adiada") { status = "adiada"; }
    else if (chamada.value == "cancelar") { status = "cancelar"; }
    else if (chamada.value == "finalizada") { status = "finalizada" }
    else if (chamada.value == "tarefa") { status = "tarefa" } else { status = "a-fazer" }

    console.log(index, status)
    works[index].status = status;
    chamada.value = status
    if (status == "adiada") {
        adiados.push(works[index])
    } else {
        let indexAdiado = adiados.findIndex(b => b.idElemento == dataIdElemento)
        if (indexAdiado >= 0) adiados.splice(indexAdiado, 1) // Remove 1 elemento somente se existir
    }
    localStorage.setItem("tarefas", JSON.stringify(works))
    localStorage.setItem("Adiados", JSON.stringify(adiados))

    verificarTarefas()
    criarElementos()
}
