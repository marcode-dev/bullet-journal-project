import {idDia} from "./data.js";
import {adiados} from "./tarefas.js";

const tarefasCriadas = document.querySelector(".tarefas-criadas")

export const opcoes = document.getElementById("tipo");
export function criarElementos() {
    let works = JSON.parse(localStorage.getItem("tarefas")) || [];
    console.log(works)
    console.log(typeof works)

    document.querySelectorAll(".tarefa").forEach(a => { a.remove() })
    console.log(works.length)
    for (let i = 0; i < works.length; i++) {

        if (works[i].idDia == idDia) {
            const tarefaDiv = document.createElement("div");
            tarefaDiv.classList.add("input-tarefas", "tarefa");
            tarefaDiv.dataset.idElemento = works[i].idElemento

            if (works[i].tipo == "evento") {
                const tipo = document.createElement("h4");
                tipo.textContent = opcoes.value;
                tarefaDiv.appendChild(tipo); // Tranfere o título para a Div Criada
            } else if (works[i].tipo == "nota") {
                const iconeNota = document.createElement("img");
                iconeNota.classList.add("nota")
                iconeNota.src = "https://images.icon-icons.com/1875/PNG/512/note_120060.png"
                tarefaDiv.style.border = "0px"

                tarefaDiv.appendChild(iconeNota)
            } else {
                const select = document.createElement("select");
                select.id = "tipo"
                select.classList.add("tipo2");
                select.innerHTML = `
                    <option value="normal">• Tarefa</option>
                    <option value="adiada">>• Adiada</option>
                    <option value="finalizada">×• Finalizada</option>
                    <option value="cancelar">Cancelar</option>
                `;
                let linhaDeFora;
                let opacidade;
                if (works[i].status == "adiada") {
                    linhaDeFora = "2px solid yellow"
                    opacidade = "0.9"
                    select.selectedIndex = 1
                } else if (works[i].status == "cancelar") {
                    linhaDeFora = "0px"
                    opacidade = "0.6"
                    select.selectedIndex = 3
                } else if (works[i].status == "finalizada") {
                    linhaDeFora = "2px solid #88e788"
                    opacidade = "1"
                    select.selectedIndex = 2
                }
                tarefaDiv.style.outline = linhaDeFora;
                tarefaDiv.style.opacity = opacidade;

                tarefaDiv.appendChild(select);
            }

            const textoTarefa = document.createElement("h4");
            textoTarefa.textContent = works[i].conteudo;

            const apagar = document.createElement("img")
            apagar.classList.add("lixeira")

            apagar.addEventListener("click", function (e) {
                if (confirm("Deseja mesmo apagar esse elemento?")) {
                    console.log(e.target)
                    let id = Number(e.target.parentNode.dataset.idElemento)
                    e.target.parentNode.remove() //Seleciona o "elemento Pai"
                    let index = works.findIndex(d => d.idElemento === id)
                    if (index >= 0) {
                        works.splice(index, 1)
                        localStorage.setItem("tarefas", JSON.stringify(works))
                    }
                    let indexAdiado = adiados.findIndex(d => d.idElemento === id)
                    if (indexAdiado >= 0) {
                        adiados.splice(indexAdiado, 1)
                        localStorage.setItem("Adiados", JSON.stringify(adiados))
                    }
                }
            })

            apagar.src = "https://cdn-icons-png.freepik.com/512/17/17167.png";

            tarefaDiv.appendChild(textoTarefa);
            tarefaDiv.appendChild(apagar);

            tarefasCriadas.appendChild(tarefaDiv);
        }
    }
}