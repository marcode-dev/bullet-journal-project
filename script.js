const day = document.querySelector(".day");
const mesAno = document.querySelector(".mes-ano");


/*
let menuAberto = false;
menuButton.addEventListener('click', abrirMenu);

function abrirMenu() {
    menuAberto = !menuAberto;
    if (!menuAberto) {
        menu.style.width = '50px';
        menuButton.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/7216/7216128.png');
    } else {
        menu.style.width = '250px';
        menuButton.setAttribute('src', 'https://images.icon-icons.com/3871/PNG/512/menu_icon_244496.png');
    }
    menu.style.transition = '1s';
}*/

/*
projetoPagina.addEventListener("click", () => {
    window.location.href = "pagina2.html"
})*/

const agora = new Date();
day.textContent = String(agora.getDate()); // Coleta o dia
let mes = agora.toLocaleDateString('pt-BR', { month: 'long' });
let ano = String(agora.getFullYear());
mesAno.textContent = `de ${mes} de ${ano}`;
console.log(mes, ano);