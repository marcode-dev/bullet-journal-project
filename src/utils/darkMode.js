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
    bolinhaBotao.style.marginLeft = darkModeBolinha ? '16.5px' : '1.5px';
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
    const filtroNotas = document.querySelector('.filtrar-ocultar-icon');
    filtroNotas.style.filter = darkModeBolinha ? "invert(100%)" : "invert(0%)";
    filtroNotas.style.transition = "0.2s";
    // Adiciona umas transições
    document.body.style.transition = "background-image 0.5s ease-in-out";
    backgroundHeader.style.transition = "background-image 0.5s ease-in-out";

    //Alteração das variáveis
    if (darkModeAtivo === 'ativo') {
        root.style.setProperty("--cor-main", "#333333bf");
        root.style.setProperty("--cor-texto-menu", "#f3eee0d5");
        root.style.setProperty("--background-input-tarefas", "rgba(255, 254, 244, 0.9)");
    } else {
        root.style.setProperty("--cor-main", "#f3eee0d5");
        root.style.setProperty("--cor-texto-menu", "#2f1b00e4");
        root.style.setProperty("--background-input-tarefas", "rgb(255, 253, 243)");
    }
}