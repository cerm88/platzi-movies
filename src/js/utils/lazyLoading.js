// Función a la detección del observador
const loadImages = (entries, observer) => {
    entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
            const container = entry.target; // DIV
            const image = container.querySelector('img');
            image.classList.add('fade-in');
            const { src, alt } = image.dataset;
            image.src = src;
            image.alt = alt;
            observer.unobserve(container);
        });
};

// Parámetros de la instancia del observador
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

// Creando instanicia del observador
const observerSection = new IntersectionObserver(loadImages, options);

// Registrando imagen al observador
const registerImage = (target) => {
    observerSection.observe(target);
};

export default registerImage;
