const day = document.querySelector(".day");
const mesAno = document.querySelector(".mes-ano");


/*
let menuAberto = false;
menuButton.addEventListener('click', abrirMenu);

function abrirMenu() {
    menuAberto = !menuAberto;
    if (!menuAberto) {
        menu.style.width = '50px';
        menuButton.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/7216/7216128.png');
    } else {
        menu.style.width = '250px';
        menuButton.setAttribute('src', 'https://images.icon-icons.com/3871/PNG/512/menu_icon_244496.png');
    }
    menu.style.transition = '1s';
}*/

/*
projetoPagina.addEventListener("click", () => {
    window.location.href = "pagina2.html"
})*/

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


//Coleta de Informações do Input
const opcoes = document.getElementById("tipo");
const texto = document.getElementById("escrever");
const salvarTarefa = document.querySelector(".save");
const diarioPagina = document.querySelector(".diario");


// Começar a contar do dia 0
// Id: 24012026 => 0


/* Ele tenta armazenar no dia atual, se der como null, cria um novo registro 
*/

let worksTotal = JSON.parse(localStorage.getItem("tarefas")) || [];

//if (!worksTotal) { localStorage.setItem("tarefas", JSON.stringify(worksTotal)) }

let typeObject;

criarElementos()


function verificarElementos() { // Se tiver algo escrito no campo de texto e a pessoas salvar, vai criar automaticamente
    if (!texto.value) {
        alert("Preencha os campos corretamente!");
        return;
    }
    if (texto.value) {
        let idElemento = Date.now()
        typeObject = opcoes.value;

        salvarNoJSON(idDia, idElemento, typeObject, `${texto.value}`)

        texto.value = ""; // Resetar o texto
        texto.focus()
    }
}

function salvarNoJSON(idDia, idElemento, typeObject, conteudo) {
    worksTotal = JSON.parse(localStorage.getItem("tarefas")) || []; // Lê o que tinha antes 

    worksTotal.push({
        idDia,
        idElemento,
        "tipo": typeObject,
        conteudo
    })

    localStorage.setItem("tarefas", JSON.stringify(worksTotal))
    criarElementos();
}


function criarElementos() {
    console.log(worksTotal)
    console.log(typeof worksTotal)

    document.querySelectorAll(".tarefa").forEach(a => { a.remove() })
    console.log(worksTotal.length)
    for (let i = 0; i < worksTotal.length; i++) {

        if (worksTotal[i].idDia == idDia) {
            const tarefaDiv = document.createElement("div");
            tarefaDiv.classList.add("input-tarefas", "tarefa");

            if (worksTotal[i].tipo == "evento") {
                const tipo = document.createElement("h4");
                tipo.textContent = opcoes.value;
                tarefaDiv.appendChild(tipo); // Tranfere o título para a Div Criada
            } else if (worksTotal[i].tipo == "nota") {
                const iconeNota = document.createElement("img");
                iconeNota.classList.add("nota")
                iconeNota.src = "https://images.icon-icons.com/1875/PNG/512/note_120060.png"
                tarefaDiv.style.border = "0px"

                tarefaDiv.appendChild(iconeNota)
            } else {
                const select = document.createElement("select");
                select.id = "tipo"
                select.innerHTML = `
                    <option>• Tarefa</option>
                    <option>>• Adiada</option>
                    <option>×• Finalizada</option>
                `;
                tarefaDiv.appendChild(select);
            }

            const textoTarefa = document.createElement("h4");
            textoTarefa.textContent = worksTotal[i].conteudo;

            const apagar = document.createElement("img")
            apagar.classList.add("lixeira")
            apagar.dataset.idElemento = worksTotal[i].idElemento

            apagar.addEventListener("click", function (e) {
                if (confirm("Deseja mesmo apagar esse elemento?")) {
                    console.log(e.target)
                    e.target.parentNode.remove() //Seleciona o "elemento Pai"
                    let id = Number(e.target.dataset.idElemento)
                    let index = worksTotal.findIndex(d => d.idElemento === id)
                    if (index >= 0) { 
                        worksTotal.splice(index, 1)
                        localStorage.setItem("tarefas", JSON.stringify(worksTotal))
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



