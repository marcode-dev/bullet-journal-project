//Mudar estilo da tarefa de acordo com o status da mesma
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let adiados = JSON.parse(localStorage.getItem("Adiados")) || [];
import { criarElementos } from "./criarElementos.js";
// import { selectType } from "./main.js";
// console.log("teste")
const tarefasCriadas = document.querySelector(".tarefas-criadas")

tarefasCriadas.addEventListener("change", (event) => {
    if (!event.target.classList.contains("tipo2")) return;

    //normal, adiada, cancelar, finalizada
    let chamada = event.target
    let status;
    let dataIdElemento = chamada.parentNode.dataset.idElemento
    let index = works.findIndex(a => a.idElemento == dataIdElemento)
    if (index < 0) return;

    if (chamada.value == "adiada") { status = "adiada"; }
    else if (chamada.value == "cancelar") { status = "cancelar"; }
    else if (chamada.value == "finalizada") { status = "finalizada" }

    console.log(index, status)
    works[index].status = status;
    chamada.value = status
    if (status == "adiada") {
        adiados.push(works[index])
    } else {
        let indexAdiado = adiados.findIndex(b => b.idElemento == dataIdElemento)
        adiados.splice(indexAdiado, 1) // Remove 1 elemento do índice indexAdiado
    }

    localStorage.setItem("tarefas", JSON.stringify(works))
    localStorage.setItem("Adiados", JSON.stringify(adiados))

    criarElementos()
})
