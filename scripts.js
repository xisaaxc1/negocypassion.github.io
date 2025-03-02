document.addEventListener('DOMContentLoaded', function() {
    // Ocultar la pantalla de carga después de 2 segundos
    setTimeout(function() {
        document.getElementById('pantallaCarga').style.display = 'none';
    }, 2000);

    const mostrarFormularioBtn = document.getElementById('mostrarFormulario');
    const vaciarFormularioBtn = document.getElementById('vaciarFormulario');
    const formulario = document.getElementById('formulario');
    const multiStepForm = document.getElementById('multiStepForm');
    const formPages = document.querySelectorAll('.form-page');
    let currentPage = 0;

    mostrarFormularioBtn.addEventListener('click', function() {
        formulario.style.display = 'block';
        vaciarFormularioBtn.style.display = 'block';
        mostrarFormularioBtn.style.display = 'none';
        formPages[currentPage].style.display = 'block';

        // Revisar si hay un temporizador activo
        const lastSubmitted = localStorage.getItem('lastSubmitted');
        if (lastSubmitted) {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastSubmitted;
            if (timeDiff < 10 * 60 * 1000) { // 10 minutos en milisegundos
                const remainingTime = Math.ceil((10 * 60 * 1000 - timeDiff) / 1000 / 60);
                alert(`Debe esperar ${remainingTime} minutos antes de volver a enviar el formulario.`);
                formulario.style.display = 'none';
                mostrarFormularioBtn.style.display = 'block';
                vaciarFormularioBtn.style.display = 'none';
                return;
            }
        }
    });

    vaciarFormularioBtn.addEventListener('click', function() {
        multiStepForm.reset();
        formulario.style.display = 'none';
        vaciarFormularioBtn.style.display = 'none';
        mostrarFormularioBtn.style.display = 'block';
        currentPage = 0;
        formPages.forEach((page, index) => {
            if (index === 0) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    });

    multiStepForm.addEventListener('submit', function() {
        const currentTime = new Date().getTime();
        localStorage.setItem('lastSubmitted', currentTime);
    });

    const nextButtons = document.querySelectorAll('.next');
    const previousButtons = document.querySelectorAll('.previous');

    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (currentPage < formPages.length - 1) {
                formPages[currentPage].style.display = 'none';
                currentPage++;
                formPages[currentPage].style.display = 'block';
            }
        });
    });

    previousButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (currentPage > 0) {
                formPages[currentPage].style.display = 'none';
                currentPage--;
                formPages[currentPage].style.display = 'block';
            }
        });
    });
    
    // Añadir animaciones de entrada
    document.addEventListener("DOMContentLoaded", function() {
        const elements = document.querySelectorAll('.container, .definiciones, .requisitos, .preguntas-frecuentes');
        elements.forEach((element) => {
            element.style.opacity = 0;
            element.style.transition = "opacity 1s ease-in-out";
            setTimeout(() => {
                element.style.opacity = 1;
            }, 500);
        });
    });
});
