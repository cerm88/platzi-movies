import env from '../ENV/env.js';
import intersectionObserverIsSupported from '../constants/consts.js';
import {
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
import requestError from './requestError.js';
import registerImage from './lazyLoading.js';

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

function addImageContainer({ nodeContainer, id, posterPath, title }) {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');
    const buttonLike = document.createElement('button');
    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    buttonLike.classList.add('btn-like');
    // TODO: Sí el id está en el local storage, colocar el modificador de like
    const src = posterPath
        ? `${URL_IMG_BASE}${posterPath}`
        : `https://via.placeholder.com/300x450/5c218a/ffffff?text=${title}`;
    if (intersectionObserverIsSupported) {
        movieImage.setAttribute('data-src', src);
        movieImage.setAttribute('data-alt', title);
    } else {
        movieImage.src = src;
        movieImage.alt = title;
    }
    movieImage.setAttribute('data-movieid', id);
    movieImage.setAttribute('data-moviename', title);
    movieContainer.appendChild(movieImage);
    movieContainer.appendChild(buttonLike);
    nodeContainer.appendChild(movieContainer);
    return movieContainer;
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

function addLoadindScreenImageContainer(nodeContainer, times) {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');
    movieContainer.classList.add('movie-container');
    movieContainer.id = 'loading-screen';
    movieImage.classList.add('movie-img');
    movieImage.classList.add('loading-skeleton');
    movieContainer.appendChild(movieImage);
    for (let i = 0; i < times; i++) {
        const nodeClone = movieContainer.cloneNode(true);
        nodeContainer.appendChild(nodeClone);
    }
}

function addLoadindScreenCategoriesContainer(nodeContainer, times) {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    categoryContainer.id = 'loading-screen';
    categoryContainer.classList.add('category-container');
    categoryTitle.classList.add('loading-skeleton');
    categoryTitle.classList.add('skeleton-text');
    categoryContainer.appendChild(categoryTitle);
    for (let i = 0; i < times; i++) {
        const nodeClone = categoryContainer.cloneNode(true);
        nodeContainer.appendChild(nodeClone);
    }
}

function addLoadindScreenText(nodeContainer, times) {
    const textContainer = document.createElement('div');
    textContainer.id = 'loading-screen';
    textContainer.classList.add('loading-skeleton');
    textContainer.classList.add('skeleton-desc');
    for (let i = 0; i < times; i++) {
        const nodeClone = textContainer.cloneNode(true);
        nodeContainer.appendChild(nodeClone);
    }
}

function removeLoadindScreenContainer(nodeContainer) {
    const nodeList = nodeContainer.childNodes;
    for (let i = nodeList.length - 1; i >= 0; i--) {
        const node = nodeList[i];
        if (node.id === 'loading-screen') node.remove();
    }
}

const trendingMoviesPreview = async () => {
    try {
        // Agregando loading screen
        addLoadindScreenImageContainer(trendingMoviesPreviewList, 6);
        // Importando datos
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'));
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            const container = addImageContainer({
                nodeContainer: trendingMoviesPreviewList,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
        // Removiendo loading screen
        const trendingMoviesPreviewListUpdate = document.querySelector(
            '.trendingPreview-movieList',
        );
        removeLoadindScreenContainer(trendingMoviesPreviewListUpdate);
    } catch (error) {
        requestError(error);
    }
};

const categoriesMoviesPreview = async () => {
    try {
        // Agregando loading screen
        addLoadindScreenCategoriesContainer(categoriesPreviewList, 10);
        // Importando datos
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
        // Removiendo loading screen
        const categoriesPreviewListUpdate = document.querySelector('.categoriesPreview-list');
        removeLoadindScreenContainer(categoriesPreviewListUpdate);
    } catch (error) {
        requestError(error);
    }
};

const moviesByCategory = async (id, page = 1) => {
    const dataUtil = {};
    try {
        // Agregando loading screen
        addLoadindScreenImageContainer(genericSection, 6);
        // Importando datos
        // with_genres también lo podemos enviar como params desde axios en esta instancia
        const { status, data } = await api.get(`${URL_MOVIES_BY_CATEG_RES}?with_genres=${id}`, {
            params: { page },
        });
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            const container = addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
        // Removiendo loading screen
        const genericSectionUpdate = document.querySelector('#genericList');
        removeLoadindScreenContainer(genericSectionUpdate);
        dataUtil.total_pages = data.total_pages;
    } catch (error) {
        requestError(error);
    }
    return dataUtil;
};

const searchMoviesByText = async (query, page = 1) => {
    const dataUtil = {};
    try {
        // Agregando loading screen
        addLoadindScreenImageContainer(genericSection, 6);
        // Importando datos
        // Aqui hemos pasado a query como parámetro en axios
        const { status, data } = await api.get(URL_MOVIES_SEARCH_RES, {
            params: { query, page },
        });
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            const container = addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
        // Removiendo loading screen
        const genericSectionUpdate = document.querySelector('#genericList');
        removeLoadindScreenContainer(genericSectionUpdate);
        dataUtil.total_pages = data.total_pages;
    } catch (error) {
        requestError(error);
    }
    return dataUtil;
};

const trendingMovies = async (page = 1) => {
    const dataUtil = {};
    try {
        // Agregando loading screen
        addLoadindScreenImageContainer(genericSection, 6);
        // Importando datos
        const { status, data } = await api.get(URL_TRENDING_RES('movie', 'day'), {
            params: { page },
        });
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            const container = addImageContainer({
                nodeContainer: genericSection,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
        // Removiendo loading screen
        const genericSectionUpdate = document.querySelector('#genericList');
        removeLoadindScreenContainer(genericSectionUpdate);
        dataUtil.total_pages = data.total_pages;
    } catch (error) {
        requestError(error);
    }
    return dataUtil;
};

const movieById = async (id) => {
    try {
        // Agregando loading screen
        addLoadindScreenText(movieDetailTitle, 1);
        addLoadindScreenText(movieDetailDescription, 5);
        addLoadindScreenCategoriesContainer(movieDetailCategoriesList, 4);
        // Importando datos
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
        movieDetailScore.appendChild(document.createTextNode(movie.vote_average));
        movieDetailDescription.appendChild(document.createTextNode(movie.overview));
        // Categorías relacionada a la película
        const categories = movie.genres;
        categories.forEach((category) => {
            addCategoriesContainer({
                nodeContainer: movieDetailCategoriesList,
                id: category.id,
                title: category.name,
            });
        });
        // Removiendo loading screen
        const movieDetailTitleUpdate = document.querySelector('.movieDetail-title');
        const movieDetailDescriptionUpdate = document.querySelector('.movieDetail-description');
        const movieDetailCategoriesListUpdate = document.querySelector(
            '#movieDetail .categories-list',
        );
        removeLoadindScreenContainer(movieDetailTitleUpdate);
        removeLoadindScreenContainer(movieDetailDescriptionUpdate);
        removeLoadindScreenContainer(movieDetailCategoriesListUpdate);
    } catch (error) {
        requestError(error);
    }
};

const relatedMoviesById = async (id) => {
    try {
        // Agregando loading screen
        addLoadindScreenImageContainer(relatedMoviesContainer, 6);
        const { status, data } = await api.get(URL_MOVIES_RECOMM_RES(id));
        // Importando datos
        if (status !== 200) throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
        const movies = data.results;
        movies.forEach((movie) => {
            const container = addImageContainer({
                nodeContainer: relatedMoviesContainer,
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
        // Removiendo loading screen
        const genericSectionUpdate = document.querySelector('.relatedMovies-scrollContainer');
        removeLoadindScreenContainer(genericSectionUpdate);
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
