const legendaInput = document.querySelectorAll(".input-legenda");

legendaInput.forEach(input => {
    input.addEventListener("input", (event) => {
        const cor = event.target.dataset.cor;
        localStorage.setItem(`legendaNotas-${cor}`, event.target.value);
    })
    input.addEventListener("click", (event) => {
        event.target.select();
    });
    input.value = localStorage.getItem(`legendaNotas-${input.dataset.cor}`) || "Adicione uma legenda aqui...";
});