const fundoBotao = document.querySelector('.fundo-toogle');
const bolinhaBotao = document.querySelector('.bolinha-toogle');

const botaoDarkMode = document.querySelector('.dark-mode');
let darkModeBolinha;

botaoDarkMode.addEventListener('click', () => {
    bolinhaBotao.classList.toggle('dark-mode-ativo');
    if (bolinhaBotao.classList.contains("dark-mode-ativo")) {
        localStorage.setItem('darkMode', 'ativo');
        aplicarDarkMode();
    } else {
        localStorage.removeItem('darkMode');
        aplicarDarkMode();
    }
})

const root = document.documentElement;
aplicarDarkMode();

export function aplicarDarkMode() {
    let darkModeAtivo = localStorage.getItem('darkMode')
    if (darkModeAtivo === 'ativo') {
        bolinhaBotao.classList.add('dark-mode-ativo');
    }
    darkModeBolinha = bolinhaBotao.classList.contains("dark-mode-ativo")

    // Bolinha do botão de dark mode
    bolinhaBotao.style.marginLeft = darkModeBolinha ? '12px' : '0.5px';
    bolinhaBotao.style.transition = "0.2s";
    // Fundo da pagina
    document.body.style.backgroundImage = darkModeBolinha ? "url('src/assets/backgrounds/background-dark.png')" : "url('src/assets/backgrounds/background.png')";
    //Fundo Header
    const backgroundHeader = document.querySelector('header');
    backgroundHeader.style.backgroundImage = darkModeBolinha ? "url('src/assets/backgrounds/background-header-dark.png')" : "url('src/assets/backgrounds/background-header.png')";
    backgroundHeader.style.boxShadow = darkModeBolinha ? "0 2px 10px rgba(255, 255, 255, 0.2)" : "0 2px 10px rgba(0, 0, 0, 0.2)";
    // Logo Header
    const logoHeader = document.querySelector('.logo-header');
    logoHeader.src = darkModeBolinha ? "src/assets/images/logo-dark.png" : "src/assets/images/markit-logo2.png";
    // Inverter as cores dos ícones do menu
    const menuIcon = document.querySelectorAll('.img');
    menuIcon.forEach(icon => {
        if (!icon.parentNode.classList.contains("selecao-menu")) {
            icon.style.filter = darkModeBolinha ? "invert(100%)" : "invert(0%)";
            icon.style.transition = "0.2s";
        }
    });

    // Inverte a cor do icone de filtrar notas
    /* const filtroNotas = document.querySelector('.filtrar-ocultar-icon');
    filtroNotas.style.filter = darkModeBolinha ? "invert(100%)" : "invert(0%)";
    filtroNotas.style.transition = "0.2s"; */
    // Adiciona umas transições
    document.body.style.transition = "background-image 0.5s ease-in-out";
    backgroundHeader.style.transition = "background-image 0.5s ease-in-out";

    //Alteração das variáveis
    if (darkModeAtivo === 'ativo') {
        root.style.setProperty("--cor-main", "#2f2a24f2");
        root.style.setProperty("--cor-texto-menu", "#f8efe1");
        root.style.setProperty("--cor-texto-fundo-claro", "#f5efe5");
        root.style.setProperty("--cor-texto-suave", "#d9d0bf");
        root.style.setProperty("--cor-texto-mais-suave", "#bfb49d");
        root.style.setProperty("--cor-surface", "rgba(54, 49, 42, 0.94)");
        root.style.setProperty("--cor-surface-2", "rgba(66, 61, 53, 0.95)");
        root.style.setProperty("--cor-borda", "rgba(255, 255, 255, 0.14)");
        root.style.setProperty("--cor-borda-forte", "rgba(255, 255, 255, 0.2)");
        root.style.setProperty("--cor-input-fundo", "rgba(39, 35, 29, 0.95)");
        root.style.setProperty("--cor-input-texto", "#f7f2e7");
        root.style.setProperty("--background-input-tarefas", "rgba(54, 49, 42, 0.95)");
        root.style.setProperty("--cor-hover-menu", "rgba(200, 191, 166, 0.18)");
        root.style.setProperty("--cor-card-import", "linear-gradient(135deg, rgba(58, 54, 46, 0.96), rgba(71, 67, 57, 0.95))");
        root.style.setProperty("--cor-card-import-alt", "rgba(41, 37, 31, 0.8)");
        root.style.setProperty("--cor-sombra", "rgba(0, 0, 0, 0.4)");
        root.style.setProperty("--cor-postit-amarelo", "#b7a94d");
    } else {
        root.style.setProperty("--cor-main", "#f3eee0d5");
        root.style.setProperty("--cor-texto-menu", "#2f1b00e4");
        root.style.setProperty("--cor-texto-fundo-claro", "#363636e4");
        root.style.setProperty("--cor-texto-suave", "#666");
        root.style.setProperty("--cor-texto-mais-suave", "#777");
        root.style.setProperty("--cor-surface", "rgba(255, 253, 243, 0.96)");
        root.style.setProperty("--cor-surface-2", "rgba(255, 250, 236, 0.92)");
        root.style.setProperty("--cor-borda", "rgba(47, 27, 0, 0.12)");
        root.style.setProperty("--cor-borda-forte", "rgba(47, 27, 0, 0.2)");
        root.style.setProperty("--cor-input-fundo", "rgba(255, 255, 255, 0.86)");
        root.style.setProperty("--cor-input-texto", "#2c2c2c");
        root.style.setProperty("--background-input-tarefas", "rgb(255, 253, 243)");
        root.style.setProperty("--cor-hover-menu", "#c8bfa6bd");
        root.style.setProperty("--cor-card-import", "linear-gradient(135deg, rgba(255, 253, 243, 0.96), rgba(255, 249, 232, 0.92))");
        root.style.setProperty("--cor-card-import-alt", "rgba(255, 255, 255, 0.7)");
        root.style.setProperty("--cor-sombra", "rgba(47, 27, 0, 0.08)");
        root.style.setProperty("--cor-postit-amarelo", "#eee544");
    }
}