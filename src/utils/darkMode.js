const fundoBotao = document.querySelector('.fundo-toogle');
const bolinhaBotao = document.querySelector('.bolinha-toogle');

const botaoDarkMode = document.querySelector('.dark-mode');

botaoDarkMode.addEventListener('click', () => {
    bolinhaBotao.classList.toggle('dark-mode-ativo');
    if (bolinhaBotao.classList.contains('dark-mode-ativo')) {
        localStorage.setItem('darkMode', 'ativo');
        aplicarDarkMode();
    } else {
        localStorage.removeItem('darkMode');
        aplicarDarkMode();
    }
})

const root = document.documentElement;
aplicarDarkMode();
function aplicarDarkMode() {
    let darkModeAtivo = localStorage.getItem('darkMode');
    if (darkModeAtivo === 'ativo') {
        bolinhaBotao.classList.add('dark-mode-ativo');
    }
    bolinhaBotao.style.marginLeft = bolinhaBotao.classList.contains('dark-mode-ativo') ? '16.5px' : '1.5px';
    bolinhaBotao.style.transition = "0.2s";

    document.body.style.backgroundImage = bolinhaBotao.classList.contains('dark-mode-ativo') ? "url('src/assets/backgrounds/background-dark.png')" : "url('src/assets/backgrounds/background.png')";

    const backgroundHeader = document.querySelector('header');
    backgroundHeader.style.backgroundImage = bolinhaBotao.classList.contains('dark-mode-ativo') ? "url('src/assets/backgrounds/background-header-dark.png')" : "url('src/assets/backgrounds/background-header.png')";
    backgroundHeader.style.boxShadow = bolinhaBotao.classList.contains('dark-mode-ativo') ? "0 2px 10px rgba(255, 255, 255, 0.2)" : "0 2px 10px rgba(0, 0, 0, 0.2)";
    const logoHeader = document.querySelector('.logo-header');
    logoHeader.src = bolinhaBotao.classList.contains('dark-mode-ativo') ? "src/assets/images/logo-dark.png" : "src/assets/images/markit-logo2.png";

    const menuIcon = document.querySelectorAll('.img');
    menuIcon.forEach(icon => {
        icon.style.filter = bolinhaBotao.classList.contains('dark-mode-ativo') ? "invert(100%)" : "invert(0%)";
        icon.style.transition = "0.2s";
    });

    const filtroNotas = document.querySelector('.filtrar-ocultar-icon');
    filtroNotas.style.filter = bolinhaBotao.classList.contains('dark-mode-ativo') ? "invert(100%)" : "invert(0%)";
    filtroNotas.style.transition = "0.2s";

    document.body.style.transition = "background-image 0.5s ease-in-out";
    backgroundHeader.style.transition = "background-image 0.5s ease-in-out";
    if (darkModeAtivo === 'ativo') {
        root.style.setProperty("--cor-main", "#333333a3");
        root.style.setProperty("--cor-texto-menu", "#f3eee0d5");
    } else {
        root.style.setProperty("--cor-main", "#f3eee0d5");
        root.style.setProperty("--cor-texto-menu", "#2f1b00e4");
    }
}