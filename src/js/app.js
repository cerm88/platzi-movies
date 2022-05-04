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

const errorNode = document.querySelector('#error');
const rendingPreviewMoviesContainer = document.querySelector(
    '#trendingPreview .trendingPreview-movieList',
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
            rendingPreviewMoviesContainer.appendChild(movieContainer);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
}

getTrendingMoviesPreview();
