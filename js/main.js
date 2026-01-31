//Importar funções
import {criarElementos} from "./criarElementos.js";
import "./data.js";
import "./tarefas.js";
import "./tipoTarefa.js";
import "./verificarElementos.js";
import "./menuController.js";
import "./tarefas.js";
import "./notas.js";

//Criar os elementos já criados para/no o dia
criarElementos()

export let selectType = document.querySelectorAll(".tipo2");

/*
- Adicionar funcionalidade de editar elementos
    - Personalizar um modal para exclusão de conteúdo
    - Tornar cancelar elemento intangível, com a única opção de deletar
- Tornar o sistema keyboard-first


- Planejar layout das outras abas, dentro do planejamento(notas, projetos, analises, hábitos e calendário)


- Futuramente... Adicionar a aba de configurações
- Indíce de finalização de atividades no dia, com % de finalizadas e % adiadas.
*/