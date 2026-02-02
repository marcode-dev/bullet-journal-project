//Importar funções
import {criarElementos} from "./criarElementos.js";
import "./data.js";
import "./menuController.js";
import "./modal.js";
import "./notas.js";
import "./tarefasAdiadas.js";
import "./tipoTarefa.js";
import "./verificarElementos.js";

//Criar os elementos já criados para/no o dia
criarElementos()

export let selectType = document.querySelectorAll(".tipo2");

/*let adiados = JSON.parse(localStorage.getItem("Adiados"))
adiados.push({
    "idDia": "20260201",
    "conteudo": "Input forçado via código",
    "tipo": "tarefa",
    "idElemento": "1770054571730",
    "status": "adiada"
})
localStorage.setItem("Adiados", JSON.stringify(adiados));*/

/*
- Tarefas
    - Adicionar funcionalidade de arrastar e soltar para mudar a ordem das tarefas
        -Tarefas finalizadas ou canceladas serem movidas ao final da lista!
    - Tornar "cancelar" elemento intangível, com a única opção de deletar
- Notas
    - Padronizar tamanho dos postIts de notas
    - Modal "verMais" para notas grandes, com scroll interno
        -personalizar modal padrão para se assemelhar ao postIt editado.
            -Adicionar/Retirar classes para fazer a mudança.
    - Adicionar funcionalidade de editar notas já criadas
    - Filtro por cor de nota
    - Adição de legendas para cada cor
    - Índices de prioridade

- Tornar o sistema keyboard-first

- Planejar novo layout definitivo para o site como um todo
- Planejar layout das outras abas, dentro do planejamento(notas, projetos, analises, hábitos e calendário)

- Futuramente... Adicionar a aba de configurações
- Indíce de finalização de atividades no dia, com % de finalizadas e % adiadas.
*/