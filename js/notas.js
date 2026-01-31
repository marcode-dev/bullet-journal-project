//Cores post it: #27b3d9 #fca028 #f44072 #90cf4c #eee544
//Cores post it text: #006681 #814900 #730020 #3a7000 #6b6500
const quadroNotas = document.querySelector(".campo-notas")
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
let idsNotas = works.filter(a => a.tipo == "nota")
console.log(idsNotas, ": IDs notas")
const notasMenu = document.querySelector(".notas-menu")

for (let i in idsNotas) {
    const postIt = document.createElement("div")
    postIt.classList.add("post-it")
    postIt.dataset.idElemento = idsNotas[i].idElemento;
    postIt.style.backgroundColor = idsNotas[i].cor;

    const textoNota = document.createElement("p")
    textoNota.textContent = idsNotas[i].conteudo;
    const corBonita = document.createElement("select")
    corBonita.classList.add("cor-select")
    corBonita.innerHTML = `
        <option value="amarelo">🟡</option>
        <option value="azul">🔵</option>
        <option value="laranja">🟠</option>
        <option value="vermelho">🔴</option>
        <option value="verde">🟢</option>
    `;
    let ind;
    if (idsNotas[i].cor == "amarelo") { ind = 0 }
    else if (idsNotas[i].cor == "azul") { ind = 1 }
    else if (idsNotas[i].cor == "laranja") { ind = 2 }
    else if (idsNotas[i].cor == "vermelho") { ind = 3 }
    else if (idsNotas[i].cor == "verde") { ind = 4 }

    corBonita.selectedIndex = ind;
    postIt.style.backgroundColor = detectarCor(idsNotas[i].cor);

    postIt.appendChild(textoNota);
    postIt.appendChild(corBonita);
    quadroNotas.appendChild(postIt);


}
let postIts = document.querySelectorAll(".cor-select")

postIts.forEach((selecionado) => {
    selecionado.addEventListener("change", (event) => {
        let index = works.findIndex(a => a.idElemento == event.target.parentNode.dataset.idElemento)
        let cor = event.target.value;
        console.log(cor);

        event.target.parentNode.style.backgroundColor = detectarCor(cor);

        works[index].cor = cor;
        console.log(works[index].idElemento + ": Cor alterada para " + works[index].cor);

        localStorage.setItem("tarefas", JSON.stringify(works))
        /*
        Cores post it: #27b3d9 #fca028 #f44072 #90cf4c #eee544
        Cores post it text: #006681 #814900 #730020 #3a7000 #6b6500
        */
    })
})

function detectarCor(cor) {
    if (cor == "amarelo") { return "#eee544" }
    else if (cor == "verde") { return "#90cf4c" }
    else if (cor == "vermelho") { return "#f44072" }
    else if (cor == "laranja") { return "#fca028" }
    else if (cor == "azul") { return "#27b3d9" }
}