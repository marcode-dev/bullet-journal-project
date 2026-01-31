import {criarElementos} from "./criarElementos.js";
import {idDia} from "./data.js";
import {opcoes} from "./criarElementos.js";

let works = JSON.parse(localStorage.getItem("tarefas")) || []; // Lê o que tinha antes 
const texto = document.getElementById("escrever");
texto.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && !event.shiftKey) {
        event.preventDefault();
        verificarElementos()
    }
})

const salvarTarefa = document.querySelector(".save");
salvarTarefa.addEventListener("click", verificarElementos);
export function verificarElementos() { // Se tiver algo escrito no campo de texto e a pessoas salvar, vai criar automaticamente
    if (!texto.value) {
        alert("Preencha os campos corretamente!");
        return;
    } else {
        let typeObject;
        let idElemento = Date.now()
        typeObject = opcoes.value;

        salvarNoJSON(idDia, idElemento, typeObject, `${texto.value}`)

        texto.value = ""; // Resetar o texto no campo de inserção
        texto.focus() // foca no campo pra facilitar registros consecutivos
    }
}
//Guardar novos elementos no localStorage
function salvarNoJSON(idDia, idElemento, typeObject, conteudo) {
    works = JSON.parse(localStorage.getItem("tarefas")) || []; // Lê o que tinha antes 
    works.push({
        idDia,
        idElemento,
        "tipo": typeObject,
        conteudo
    })
    localStorage.setItem("tarefas", JSON.stringify(works))
    criarElementos();
}