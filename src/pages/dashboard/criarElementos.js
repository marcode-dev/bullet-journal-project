import { idDia } from "../../utils/data.js";
import { abrirModal } from "../../components/modal/modal.js";

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

            let tarefasContainer = document.querySelector(".tarefas-criadas");
            if (works[i].status == "adiada") {
                tarefasContainer = document.querySelector(".tarefas-adiadas");
            } else if (works[i].status == "cancelar") {
                tarefasContainer = document.querySelector(".tarefas-canceladas");
            } else if (works[i].status == "finalizada") {
                tarefasContainer = document.querySelector(".tarefas-finalizadas");
            }

            if (works[i].tipo == "evento") {
                const tipo = document.createElement("h4");
                tipo.classList.add("tipo-evento");
                tipo.textContent = "Evento";
                tarefaDiv.appendChild(tipo); // Tranfere o título para a Div Criada
            } else if (works[i].tipo == "nota") {
                const iconeNota = document.createElement("img");
                iconeNota.classList.add("nota")
                iconeNota.src = "https://images.icon-icons.com/1875/PNG/512/note_120060.png"
                tarefaDiv.style.border = "0px"

                tarefaDiv.appendChild(iconeNota)
            } else {
                const select = document.createElement("select");
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
                else {
                    linhaDeFora = undefined
                    opacidade = undefined
                }
                tarefaDiv.style.outline = linhaDeFora;
                tarefaDiv.style.opacity = opacidade;

                const seletorSeta = document.createElement("div");
                seletorSeta.classList.add("seta-select");

                seletorSeta.appendChild(select);
                tarefaDiv.appendChild(seletorSeta);
            }

            const textoTarefa = document.createElement("h4");
            textoTarefa.classList.add("texto-tarefa")
            textoTarefa.textContent = works[i].conteudo;

            const editar = document.createElement("img")
            editar.classList.add("editar");
            editar.src = "https://cdn-icons-png.flaticon.com/128/10747/10747217.png"

            let tituloModal;
            let conteudoModal;

            editar.addEventListener("click", () => {
                tituloModal = `Editar ${works[i].tipo}`;
                conteudoModal = `
                    <textarea type="text" class="editar-tarefas" wrap="hard" rows="5"
                        cols="10" autofocus>${works[i].conteudo}</textarea>
                `;
                abrirModal(tituloModal, conteudoModal, works[i].idElemento, "editar")
            })

            const apagar = document.createElement("img")
            apagar.classList.add("lixeira")
            apagar.addEventListener("click", function (e) {
                tituloModal = `Excluir a ${works[i].tipo}?`;
                conteudoModal = `
                <p>Você tem certeza que deseja excluir a ${works[i].tipo} selecionada?</p>
                `;
                abrirModal(tituloModal, conteudoModal, works[i].idElemento, "excluir")
            })
            apagar.src = "https://cdn-icons-png.freepik.com/512/17/17167.png";

            tarefaDiv.appendChild(textoTarefa);
            tarefaDiv.appendChild(editar);
            tarefaDiv.appendChild(apagar);

            // adiciona no container correto determinado acima
            tarefasContainer.appendChild(tarefaDiv);
        } else if (works[i].idDia > idDia) {

        }
    }
    verificarTarefas()
}
export function verificarTarefas() {
    const tAdiadas = document.querySelector(".tarefas-adiadas")
    const tCanceladas = document.querySelector(".tarefas-canceladas")
    const tFinalizadas = document.querySelector(".tarefas-finalizadas")

    // Verifica sem contar o titulo e o hr, para não considerar como tarefa
    const contarTarefas = (container) => {
        return Array.from(container.children).filter(c =>
            c.tagName !== "H5" && c.tagName !== "HR"
        ).length;
    };

    if (contarTarefas(tAdiadas) === 0) {
        tAdiadas.style.display = "none";
    } else { tAdiadas.style.display = "block"; }

    if (contarTarefas(tCanceladas) === 0) {
        tCanceladas.style.display = "none";
    } else { tCanceladas.style.display = "block"; }

    if (contarTarefas(tFinalizadas) === 0) {
        tFinalizadas.style.display = "none";
    } else { tFinalizadas.style.display = "block"; }
}