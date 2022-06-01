import navigator from './routes/navigations.js';
import * as getNode from './utils/getNode.js';
import { likeMovies } from './utils/likedData.js';

window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        // Agregando un estado de carga inical
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);

window.addEventListener(
    'hashchange',
    () => {
        navigator();
    },
    false,
);

getNode.searchFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const textInput = getNode.searchFormInput.value;
    if (textInput !== '') window.location.hash = `#search=${textInput}`;
});

getNode.trendingBtn.addEventListener('click', () => {
    window.location.hash = '#trends';
});

getNode.arrowBtn.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : window.location.origin;
    const stateLoadURL = new URL(stateLoad);
    if (stateLoadURL.hash.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
    getNode.errorNode.innerHTML = '';
});

const categoriesNode = [getNode.categoriesPreviewList, getNode.movieDetailCategoriesList];

categoriesNode.forEach((node) => {
    node.addEventListener('click', (e) => {
        const { target } = e;
        if (target && target.nodeName === 'H3') {
            const categoryID = target.dataset.categoryid;
            const categoryName = target.dataset.categoryname.toLowerCase();
            window.location.hash = `#category=${categoryID}-${categoryName}`;
        }
    });
});

const moviesNode = [
    getNode.trendingMoviesPreviewList,
    getNode.genericSection,
    getNode.relatedMoviesContainer,
    getNode.likeMovieList,
];

moviesNode.forEach((node) => {
    node.addEventListener('click', (e) => {
        const { target } = e;
        //  Evento de click descripción de la película
        if (target && target.nodeName === 'IMG') {
            const movieId = target.dataset.movieid;
            const movieName = target.dataset.moviename.toLowerCase();
            window.location.hash = `#movie=${movieId}-${movieName}`;
        }
        //  Evento de click like de la película
        if (target && target.nodeName === 'BUTTON') {
            target.classList.toggle('btn-like--like');
            const nodeImg = target.previousSibling;
            const { movieid, moviename } = nodeImg.dataset;
            const dataMovie = {
                movieid,
                src: nodeImg.src,
                alt: nodeImg.alt,
                moviename,
            };
            const isLiked = target.classList.contains('btn-like--like');
            likeMovies(dataMovie, isLiked);
        }
    });
});
