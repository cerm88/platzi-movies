import env from '../ENV/env.js';
import {
    errorNode,
    trendingMoviesPreviewList,
    categoriesPreviewList,
    genericSection,
} from './getNode.js';

const API_KEY = env.API_KEY;
const URL_IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf8',
    },
    // También la api key se puede enviar a traves de parametros si es que
    // no es posible usarlo desde los headers
    params: {
        api_key: API_KEY,
    },
});

const URL_TRENDING_RES = (mediaType, timeWindow) => `trending/${mediaType}/${timeWindow}`;
const URL_CATEORIES_RES = 'genre/movie/list';
const URL_MOVIES_BY_CATEG_RES = 'discover/movie';
const URL_MOVIES_SEARCH_RES = 'search/movie';

function addImageContainer(nodeContainer, posterPath, title) {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');
    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    if (posterPath !== null) movieImage.src = `${URL_IMG_BASE}${posterPath}`;
    movieImage.alt = title;
    movieContainer.appendChild(movieImage);
    nodeContainer.appendChild(movieContainer);
}

const trendingMoviesPreview = async () => {
    try {
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer(trendingMoviesPreviewList, movie.poster_path, movie.title);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
};

const categoriesMoviesPreview = async () => {
    try {
        const { status, data } = await api.get(URL_CATEORIES_RES);
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const categories = data.genres;
        categories.forEach((category) => {
            const categoryContainer = document.createElement('div');
            const categoryTitle = document.createElement('h3');
            categoryContainer.classList.add('category-container');
            categoryContainer.setAttribute('data-categoryid', category.id);
            categoryContainer.setAttribute('data-categoryname', category.name);
            categoryTitle.classList.add('category-title');
            categoryTitle.id = `id${category.id}`;
            const nodeTextCategory = document.createTextNode(category.name);
            categoryTitle.appendChild(nodeTextCategory);
            categoryContainer.appendChild(categoryTitle);
            categoriesPreviewList.appendChild(categoryContainer);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
};

const moviesByCategory = async (id) => {
    try {
        // with_genres también lo podemos enviar como params desde axios en esta instancia
        const { status, data } = await api.get(`${URL_MOVIES_BY_CATEG_RES}?with_genres=${id}`);
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer(genericSection, movie.poster_path, movie.title);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
};

const searchMoviesByText = async (query) => {
    try {
        // Aqui hemos pasado a query como parámetro en axios
        const { status, data } = await api.get(URL_MOVIES_SEARCH_RES, {
            params: {
                query,
            },
        });
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer(genericSection, movie.poster_path, movie.title);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
};

const trendingMovies = async () => {
    try {
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer(genericSection, movie.poster_path, movie.title);
        });
    } catch (error) {
        const msgError = `Error: ${error.message}`;
        const nodeTextError = document.createTextNode(msgError);
        errorNode.appendChild(nodeTextError);
    }
};

export default {
    trendingMoviesPreview,
    categoriesMoviesPreview,
    moviesByCategory,
    searchMoviesByText,
    trendingMovies,
};
