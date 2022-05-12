import env from '../ENV/env.js';
import {
    errorNode,
    trendingMoviesPreviewList,
    categoriesPreviewList,
    genericSection,
    movieDetailTitle,
    movieDetailDescription,
    movieDetailScore,
    movieDetailCategoriesList,
    headerSection,
    relatedMoviesContainer,
} from './getNode.js';

const { API_KEY } = env;
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
const URL_MOVIE_DETAILS_RES = (movieId) => `movie/${movieId}`;
const URL_MOVIES_RECOMM_RES = (movieId) => `movie/${movieId}/recommendations`;

function requestError(error) {
    const msgError = `Error: ${error.message}`;
    const nodeTextError = document.createTextNode(msgError);
    errorNode.appendChild(nodeTextError);
}

function addImageContainer({ nodeContainer, id, posterPath, title }) {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');
    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    if (posterPath !== null) movieImage.src = `${URL_IMG_BASE}${posterPath}`;
    movieImage.alt = title;
    movieImage.setAttribute('data-movieid', id);
    movieImage.setAttribute('data-moviename', title);
    movieContainer.appendChild(movieImage);
    nodeContainer.appendChild(movieContainer);
}

function addCategoriesContainer({ nodeContainer, id, title }) {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    categoryContainer.classList.add('category-container');
    categoryTitle.setAttribute('data-categoryid', id);
    categoryTitle.setAttribute('data-categoryname', title);
    categoryTitle.classList.add('category-title');
    categoryTitle.id = `id${id}`;
    const nodeTextCategory = document.createTextNode(title);
    categoryTitle.appendChild(nodeTextCategory);
    categoryContainer.appendChild(categoryTitle);
    nodeContainer.appendChild(categoryContainer);
}

const trendingMoviesPreview = async () => {
    try {
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer({
                nodeContainer: trendingMoviesPreviewList,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const categoriesMoviesPreview = async () => {
    try {
        const { status, data } = await api.get(URL_CATEORIES_RES);
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const categories = data.genres;
        categories.forEach((category) => {
            addCategoriesContainer({
                nodeContainer: categoriesPreviewList,
                id: category.id,
                title: category.name,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const moviesByCategory = async (id) => {
    try {
        // with_genres también lo podemos enviar como params desde axios en esta instancia
        const { status, data } = await api.get(`${URL_MOVIES_BY_CATEG_RES}?with_genres=${id}`);
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const searchMoviesByText = async (query) => {
    try {
        // Aqui hemos pasado a query como parámetro en axios
        const { status, data } = await api.get(URL_MOVIES_SEARCH_RES, {
            params: { query },
        });
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const trendingMovies = async () => {
    try {
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const movieById = async (id) => {
    try {
        const { status, data: movie } = await api.get(URL_MOVIE_DETAILS_RES(id));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        // Agregando imagen desde css
        const movieImgUrl = `${URL_IMG_BASE}${movie.poster_path}`;
        headerSection.style.background = `
            linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.35) 19.27%,
                rgba(0, 0, 0, 0) 29.17%
            ),
            url(${movieImgUrl})
        `;
        headerSection.style.backgroundPosition = 'center';
        headerSection.style.backgroundRepeat = 'no-repeat';
        headerSection.style.backgroundSize = 'cover';
        // Detalles de la película
        movieDetailTitle.appendChild(document.createTextNode(movie.original_title));
        movieDetailDescription.appendChild(document.createTextNode(movie.overview));
        movieDetailScore.appendChild(document.createTextNode(movie.vote_average));
        // Categorías relacionada a la película
        const categories = movie.genres;
        categories.forEach((category) => {
            addCategoriesContainer({
                nodeContainer: movieDetailCategoriesList,
                id: category.id,
                title: category.name,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

const relatedMoviesById = async (id) => {
    try {
        const { status, data } = await api.get(URL_MOVIES_RECOMM_RES(id));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            addImageContainer({
                nodeContainer: relatedMoviesContainer,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
        });
    } catch (error) {
        requestError(error);
    }
};

export default {
    trendingMoviesPreview,
    categoriesMoviesPreview,
    moviesByCategory,
    searchMoviesByText,
    trendingMovies,
    movieById,
    relatedMoviesById,
};
