const day = document.querySelector(".day");
const mesAno = document.querySelector(".mes-ano");

const agora = new Date();

let dia = agora.getDate()
day.textContent = String(dia); // Coleta o dia
let mesEscrito = agora.toLocaleDateString('pt-BR', { month: 'long' });
let mesNum = agora.getMonth() + 1;
let ano = String(agora.getFullYear());

function zeroAEsquerda(valor) {
    return valor <= 9 ? `0${valor}` : String(valor); // condição ? retorne isso, senão : isso!
}

let idDia = ano + zeroAEsquerda(mesNum) + zeroAEsquerda(dia);
console.log(idDia)

mesAno.textContent = `de ${mesEscrito} de ${ano}`;
console.log(mesEscrito, ano);
//Seleciona elementos relacionados a inserção de tarefas
const opcoes = document.getElementById("tipo");
const texto = document.getElementById("escrever");
texto.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && !event.shiftKey){
        event.preventDefault();
        verificarElementos()
    }
})
const salvarTarefa = document.querySelector(".save");
//Seleciona as seções de cada tela/pagina
const diarioPagina = document.querySelector(".diario");
const notasPagina = document.querySelector(".notas");
//Os itens do menu
const notaMenu = document.querySelector(".notas-menu");
const diarioMenu = document.querySelector(".diario-menu");

notasPagina.style.display = "none"; //Classifica inicialmente para que a tela inicial seja sempre DiarioPagina (Alterar esse método quando adicionar mais paginas)
//Armazenamento/Recolimento de informações do localStorage
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let adiados = JSON.parse(localStorage.getItem("Adiados")) || [];
let aindaAdiados = [];
let typeObject;

for (let i = 0; i < adiados.length; i++) {
    if (adiados[i].idDia != idDia) {
        adiados[i].status = "normal"
        adiados[i].idDia = idDia;
        let index = works.findIndex(a => a.idElemento == adiados[i].idElemento)
        if (index >= 0) {
            works.splice(index, 1)
        }
        works.push(adiados[i])
    } else {
        aindaAdiados.push(adiados[i])
    }
}
//Pensar na possibilidade de adiados poderem ter mais de um idDia
adiados = aindaAdiados;
aindaAdiados = [];
localStorage.setItem("Adiados", JSON.stringify(adiados));
localStorage.setItem("tarefas", JSON.stringify(works));

//Criar os elementos já criados para/no o dia
criarElementos()
// Uma verificação antes de criar uma tarefa nova, atualmente apenas confere o campo de texto, para não criar registros em branco
function verificarElementos() { // Se tiver algo escrito no campo de texto e a pessoas salvar, vai criar automaticamente
    if (!texto.value) {
        alert("Preencha os campos corretamente!");
        return;
    } else {
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

function criarElementos() {
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
                    <option value="cancelar"><span class="sublinhado">Cancelar</span></option>
                    <option value="finalizada">×• Finalizada</option>
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
                    select.selectedIndex = 2
                } else if (works[i].status == "finalizada") {
                    linhaDeFora = "2px solid #88e788"
                    opacidade = "1"
                    select.selectedIndex = 3
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
                }
            })

            apagar.src = "https://cdn-icons-png.freepik.com/512/17/17167.png";

            tarefaDiv.appendChild(textoTarefa);
            tarefaDiv.appendChild(apagar);

            diarioPagina.appendChild(tarefaDiv);
        }
    }
}

salvarTarefa.addEventListener("click", verificarElementos);

const selecaoMenu = document.querySelector(".selecao-menu");

//Trocar a Aba
diarioMenu.addEventListener("click", () => {
    diarioPagina.style.display = "block";
    notasPagina.style.display = "none";
    selecaoMenu.style.top = "-93px";
})
notaMenu.addEventListener("click", () => {
    diarioPagina.style.display = "none";
    notasPagina.style.display = "block";
    selecaoMenu.style.top = "-47px";
});


//Mudar estilo da tarefa de acordo com o status da mesma
selectType = document.querySelectorAll(".tipo2");

selectType.forEach(addEventListener("change", (event) => {
    //A cada mudança, ele pode 
    if (!event.target.classList.contains("tipo2")) return;

    //normal, adiada, cancelar, finalizada
    let chamada = event.target
    let status;
    let dataIdElemento = chamada.parentNode.dataset.idElemento
    let index = works.findIndex(a => a.idElemento == dataIdElemento)
    if (index < 0) return;

    if (chamada.value == "adiada") {
        status = "adiada";
    }
    else if (chamada.value == "cancelar") { status = "cancelar" }
    else if (chamada.value == "finalizada") { status = "finalizada" }

    console.log(index, status)
    works[index].status = status;
    chamada.value = status
    if (status == "adiada") {
        adiados.push(works[index])
        console.log(adiados)
        localStorage.setItem("Adiados", JSON.stringify(adiados));
    } else {
        let indexAdiado = adiados.findIndex(b => b.idElemento == dataIdElemento)
        adiados.splice(indexAdiado, 1) // Remove 1 elemento do índice indexAdiado
        localStorage.setItem("Adiados", JSON.stringify(adiados))
    }

    localStorage.setItem("tarefas", JSON.stringify(works))

    criarElementos()
}))

/*
- Adicionar funcionalidade de editar elementos
    - Personalizar um modal para exclusão de conteúdo
- Tornar o sistema keyboard-first

- Planejar layout das outras abas, dentro do planejamento(notas, projetos, analises, hábitos e calendário)
- Futuramente... Adicionar a aba de configurações
- Indíce de finalização de atividades no dia, com % de finalizadas e % adiadas.
*/