import { criarElementos } from "../pages/dashboard/criarElementos.js";
import { idDia } from "./data.js";

let works = JSON.parse(localStorage.getItem("tarefas")) || []; // Lê o que tinha antes 

export function verificarElementos() { // Se tiver algo escrito no campo de texto e a pessoas salvar, vai criar automaticamente
    const texto = document.getElementById("escrever");
    const opcoes = document.getElementById("tipo");
    if (!texto.value) {
        alert("Preencha os campos corretamente!");
        return;
    } else {
        let typeObject;
        let idElemento = Date.now()
        typeObject = opcoes.value;

        salvarNoJSON(idDia, idElemento, typeObject, `${texto.value}`)

        texto.value = ""; // Resetar o texto no campo de inserção
        criarElementos();
        /* texto.focus() */
    }
}
//Guardar novos elementos no localStorage
function salvarNoJSON(idDia, idElemento, typeObject, conteudo) {
    works = JSON.parse(localStorage.getItem("tarefas")) || []; // Lê o que tinha antes 
    works.push({
        idDia,
        idElemento,
        "tipo": typeObject,
        conteudo,
        cor: typeObject == "nota" ? "amarelo" : undefined
    })
    localStorage.setItem("tarefas", JSON.stringify(works))
    criarElementos();
}