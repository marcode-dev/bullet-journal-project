import { idDia } from "../../utils/data.js";
import { abrirModal } from "../../components/modal/modal.js";

const newTask = document.querySelector(".new-task")
newTask.addEventListener("click", () => {
    let tituloModal = "Nova Tarefa";
    // <option value="evento" class="opcao">○ Evento</option>
    let conteudoModal = `
    <label for="escrever">
        
            <div class="seta-select-input">
                <select name="tarefa" id="tipo">
                    <option value="tarefa" class="opcao">• Tarefa</option>
                    <option value="nota" class="opcao">— Nota</option>
                </select>
            </div> <!-- .seta-select -->

            <textarea type="text" placeholder="Escreva sua tarefa aqui..." id="escrever" wrap="hard" rows="5"
                cols="10" autofocus></textarea>
        
    </label> <!--.escrever-->`;
    abrirModal(
        tituloModal, 
        conteudoModal, 
        "", 
        "add-task"
    )
})

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
            if (works[i].tipo == "nota") {
                tarefasContainer = document.querySelector(".tarefas-notas");
            } else if (works[i].status == "adiada") {
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

            const icons = document.createElement("div");
            icons.classList.add("task-actions");

            icons.appendChild(editar);
            icons.appendChild(apagar);

            tarefaDiv.appendChild(textoTarefa);
            tarefaDiv.appendChild(icons)

            // adiciona no container correto determinado acima
            tarefasContainer.appendChild(tarefaDiv);
        } else if (works[i].idDia > idDia) {
            //-----------------------------------Fazer alguma coisa aqui??
        }
    }
    verificarTarefas()
}

export function verificarTarefas() {
    const tPendentes = document.querySelector(".tarefas-criadas")
    const tAdiadas = document.querySelector(".tarefas-adiadas")
    const tCanceladas = document.querySelector(".tarefas-canceladas")
    const tFinalizadas = document.querySelector(".tarefas-finalizadas")
    const tNotas = document.querySelector(".tarefas-notas")

    // Verifica sem contar o titulo e o hr, para não considerar como tarefa
    const contarTarefas = (container) => {
        if (!container) return 0;
        return Array.from(container.children).filter(c =>
            c.tagName !== "H5" && c.tagName !== "HR"
        ).length;
    };

    const numPendentes = contarTarefas(tPendentes);
    const numAdiadas = contarTarefas(tAdiadas);
    const numCanceladas = contarTarefas(tCanceladas);
    const numFinalizadas = contarTarefas(tFinalizadas);
    const numNotas = contarTarefas(tNotas);
    const numTodos = numPendentes + numAdiadas + numFinalizadas + numCanceladas + numNotas;

    if (document.querySelector(".todos-tab h4")) document.querySelector(".todos-tab h4").textContent = `Todos (${numTodos})`;
    if (document.querySelector(".pendentes-tab h4")) document.querySelector(".pendentes-tab h4").textContent = `Pendentes (${numPendentes})`;
    if (document.querySelector(".adiadas-tab h4")) document.querySelector(".adiadas-tab h4").textContent = `Adiadas (${numAdiadas})`;
    if (document.querySelector(".finalizadas-tab h4")) document.querySelector(".finalizadas-tab h4").textContent = `Finalizadas (${numFinalizadas})`;
    if (document.querySelector(".canceladas-tab h4")) document.querySelector(".canceladas-tab h4").textContent = `Canceladas (${numCanceladas})`;
    if (document.querySelector(".notas-tab h4")) document.querySelector(".notas-tab h4").textContent = `Notas (${numNotas})`;

    if (numAdiadas === 0 && tAdiadas) {
        tAdiadas.style.display = "none";
    } else if (tAdiadas) { tAdiadas.style.display = "block"; }

    if (numCanceladas === 0 && tCanceladas) {
        tCanceladas.style.display = "none";
    } else if (tCanceladas) { tCanceladas.style.display = "block"; }

    if (numFinalizadas === 0 && tFinalizadas) {
        tFinalizadas.style.display = "none";
    } else if (tFinalizadas) { tFinalizadas.style.display = "block"; }
}

const searchInput = document.getElementById("search-diary");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll(".tarefa").forEach(tarefa => {
            const texto = tarefa.querySelector(".texto-tarefa")?.textContent.toLowerCase() || "";
            tarefa.style.display = texto.includes(term) ? "" : "none";
        });
    });
}