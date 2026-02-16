import { abrirModal } from "./modal.js";

const registrar = document.querySelector(".registrar");
const tipoImportacao = document.querySelector("#tipo-importacao");
const importarInput = document.querySelector("#importar-json");
const colarJson = document.querySelector("#colar-json");


registrar.addEventListener("click", () => {
    console.log("registrar")
    if (!importarInput.value && !colarJson.value) {
        alert("Por favor, selecione um arquivo ou cole o JSON para importar.");
        return;
    } if (importarInput.value && colarJson.value) {

    } if (importarInput.value) {
        const file = importarInput.files[0]; // Pega o arquivo selecionado
        const reader = new FileReader(); // Cria um FileReader para ler o conteúdo do arquivo

        reader.onload = function (event) {
            try {
                const dadosImportados = JSON.parse(event.target.result); // Tenta converter o conteúdo do arquivo para JSON
                processar(dadosImportados);
            } catch (error) {
                alert("Erro ao ler o arquivo. Certifique-se de que é um arquivo JSON válido.");
            }
        };

        reader.readAsText(file); // Lê o conteúdo do arquivo como texto
    } if (colarJson.value) {
        try {
            const dadosImportados = JSON.parse(colarJson.value); // Tenta converter o conteúdo do textarea para JSON
            processar(dadosImportados);
            colarJson.value = ""; // Limpa o textarea após a importação
        } catch (error) {
            alert("Erro ao ler o JSON. Certifique-se de que o texto é um JSON válido.");
        }
    }
});

function processar(dadosImportados) {
    console.log("Os dados estão sendo processados...")
    if (!Array.isArray(dadosImportados)) {
        alert("O arquivo JSON não é válido.");
        return;
    } else {
        if (tipoImportacao.value === "adicionar") {
            let nSubstituido = [];
            let dadosAtuais = JSON.parse(localStorage.getItem("tarefas")) || [];
            for (let i = 0; dadosImportados.length > i; i++) {
                let index = dadosAtuais.findIndex(d => d.idElemento === dadosImportados[i].idElemento)
                if (index >= 0) {
                    nSubstituido.push(index)
                } else {
                    console.log("Não há nenhum idElemento igual, a tarefa será adicionada normalmente.")
                }
            }
            nSubstituido.sort((a, b) => b - a); // Ordem decrescente
            for (let i = 0; i < nSubstituido.length; i++) {
                dadosAtuais.splice(nSubstituido[i], 1)
            }
            let dadosConcatenados = dadosAtuais.concat(dadosImportados);
            localStorage.setItem("tarefas", JSON.stringify(dadosConcatenados));
            console.log("Tarefas adicionadas com sucesso!");
            abrirModal("Importação Concluída", `<p>${dadosImportados.length} tarefas importadas. ${nSubstituido.length} tarefas substituídas.</p>`, null, "success");
            console.log(dadosConcatenados);

        } else if (tipoImportacao.value === "substituir") {
            abrirModal("Verificar Importação", `<p>Tem certeza que deseja substituir todas as tarefas atuais por estas ${dadosImportados.length} tarefas importadas?</p>`, null, "confirmar");
            localStorage.setItem("tarefas", JSON.stringify(dadosImportados));
            console.log("Tarefas substituídas com sucesso!");
            console.log(dadosImportados);
            abrirModal("Importação Concluída", `<p>${dadosImportados.length} tarefas importadas, substituindo todas as tarefas anteriores.</p>`, null, "success");
        }
    }
}