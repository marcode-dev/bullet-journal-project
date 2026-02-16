//Importar funções
import "./data.js";
import {criarElementos} from "./criarElementos.js";
import "./menuController.js";
import "./modal.js";
import "./notas.js";
import "./tarefasAdiadas.js";
import "./tipoTarefa.js";
import "./verificarElementos.js";
import "./exportar.js";
import "./importar.js";

//Criar os elementos já criados para/no o dia
criarElementos()

export let selectType = document.querySelectorAll(".tipo2");

/*
- Tarefas
    - Adicionar funcionalidade de arrastar e soltar para mudar a ordem das tarefas
    - Tornar "cancelar" elemento intangível, com a única opção de deletar
- Notas
    - Modal "verMais" para notas grandes, com scroll interno
    - Filtro por cor de nota
    - Adição de legendas para cada cor personalizadas pelo usuario
    - Índices de prioridade

Adaptar menu para dispositivos móveis

- O que há de novo nas atualizações

- Tornar o sistema keyboard-first

- Planejar novo layout definitivo para o site como um todo
- Planejar layout das outras abas, dentro do planejamento(notas, projetos, analises, hábitos e calendário)

- Futuramente... Adicionar a aba de configurações
- Indíce de finalização de atividades no dia, com % de finalizadas e % adiadas.
*/