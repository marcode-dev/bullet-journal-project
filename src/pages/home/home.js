//Importar funções e arquivos necessários para a página
import "../../components/modal/modal.js";
import "../../components/navbar/menuController.js";

import { criarElementos } from "../../pages/dashboard/criarElementos.js";
import "../../pages/dashboard/delayedTasks.js";
import "../../pages/dashboard/gradeLegends.js";
import "../dashboard/notas/notes.js"
import { criarNotas } from "../dashboard/notas/notes.js";
import "../dashboard/notas/filtrosNotas.js";
import "../../pages/dashboard/taskTypes.js";

import "../../services/exportService.js";
import "../../services/importService.js";

import "../../utils/data.js";
import "../../utils/verificarElementos.js";
import "../../utils/darkMode.js";
import { abrirModal } from "../../components/modal/modal.js";

//Criar os elementos já criados para/no o dia
criarElementos()
criarNotas()

abrirModal()
export let selectType = document.querySelectorAll(".tipo2");


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2rGgjtXoP3ibEzksh7ZvxCdtVdkRg9lo",
    authDomain: "bullet-journal-948be.firebaseapp.com",
    projectId: "bullet-journal-948be",
    storageBucket: "bullet-journal-948be.firebasestorage.app",
    messagingSenderId: "555087682080",
    appId: "1:555087682080:web:e2bddf655595d1ada43a45",
    measurementId: "G-5KBPNW18GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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