import env from './ENV/env.js';

const API_KEY = env.API_KEY;
const URL_IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const URL_TRENDING = (mediaType, timeWindow) => {
    const params = [
        `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`,
        '?',
        `api_key=${API_KEY}`,
    ];
    return params.join('');
};

const URL_CATEORIES = [
    'https://api.themoviedb.org/3//genre/movie/list',
    '?',
    `api_key=${API_KEY}`,
].join('');

const errorNode = document.querySelector('#error');
const trendingMoviesPreviewContainer = document.querySelector(
    '#trendingPreview .trendingPreview-movieList',
);
const categoriesMoviesPreviewContainer = document.querySelector(
    '#categoriesPreview .categoriesPreview-list',
);

async function getTrendingMoviesPreview() {
    try {
        const response = await fetch(URL_TRENDING('movie', 'day'));
        const status = response.status;
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const data = await response.json();
        const movies = data.results;
        movies.forEach((movie) => {
            const movieContainer = document.createElement('div');
            const movieImage = document.createElement('img');
            movieContainer.classList.add('movie-container');
            movieImage.classList.add('movie-img');
            movieImage.src = `${URL_IMG_BASE}${movie.poster_path}`;
            movieImage.alt = movie.title;
            movieContainer.appendChild(movieImage);
            trendingMoviesPreviewContainer.appendChild(movieContainer);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
}

async function getCategoriesMoviesPreview() {
    try {
        const response = await fetch(URL_CATEORIES);
        const status = response.status;
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const data = await response.json();
        const categories = data.genres;
        categories.forEach((category) => {
            const categoryContainer = document.createElement('div');
            const categoryTitle = document.createElement('h3');
            categoryContainer.classList.add('category-container');
            categoryTitle.classList.add('category-title');
            categoryTitle.id = `id${category.id}`;
            const nodeTextCategory = document.createTextNode(category.name);
            categoryTitle.appendChild(nodeTextCategory);
            categoryContainer.appendChild(categoryTitle);
            categoriesMoviesPreviewContainer.appendChild(categoryContainer);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
}

getTrendingMoviesPreview();

getCategoriesMoviesPreview();
