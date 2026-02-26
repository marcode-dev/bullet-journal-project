import { abrirModal } from "../components/modal/modal.js";
let works = JSON.parse(localStorage.getItem("tarefas")) || [];
const exportarButton = document.querySelector(".exportar-button");
const notaDesenvolvedor = document.querySelector(".nota-desenvolvedor-marcos");

notaDesenvolvedor.addEventListener("click", () => {
    let titulo = "Sobre a funcionalidade de Importação/Exportação";
    let texto = `Este projeto está hospedado no GitHub Pages, que não oferece suporte a backend ou banco de dados.
        \nPor isso, as tarefas são armazenadas localmente no navegador (localStorage).
        \nPara permitir backup e migração de dados entre dispositivos, implementei a funcionalidade de exportar e importar tarefas manualmente.
        \nEm uma versão futura, com integração a um backend, os dados poderão ser sincronizados automaticamente em nuvem.
    `;
    abrirModal(titulo, `<p class="sobre">${texto}</p>`, null, "info");
    const sobreTexto = document.querySelector(".sobre");
    sobreTexto.style.whiteSpace = "pre-line"; // Preserva quebras de linha

})

exportarButton.addEventListener("click", () => { downloadJSON(works, "tarefas.json"); });

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    //null e 2 são só pra formatação do JSON

    //Link
    const url = URL.createObjectURL(blob); //Cria uma URL temporária
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url); //Apaga a URL temporária
}
// Uso: downloadJSON(dados, 'dados.json');
