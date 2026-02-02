import { idDia } from './data.js';

export let adiados = JSON.parse(localStorage.getItem("Adiados")) || [];
let aindaAdiados = [];
let works = JSON.parse(localStorage.getItem("tarefas")) || [];

for (let i = 0; i < adiados.length; i++) {
    if (adiados[i].idDia != idDia) {
        adiados[i].status = "normal";
        adiados[i].idDia = idDia;
        let index = works.findIndex(a => a.idElemento == adiados[i].idElemento);
        if (index >= 0) {
            works.splice(index, 1);
        }
        works.push(adiados[i]);
    } else {
        aindaAdiados.push(adiados[i]);
    }
}
//Pensar na possibilidade de adiados poderem ter mais de um idDia
adiados = aindaAdiados;
aindaAdiados = [];
if (adiados){
    localStorage.setItem("Adiados", JSON.stringify(adiados));
}
localStorage.setItem("tarefas", JSON.stringify(works));