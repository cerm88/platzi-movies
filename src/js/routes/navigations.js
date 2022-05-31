import getData from '../utils/getData.js';
import * as getNode from '../utils/getNode.js';
import smoothscroll from '../utils/smoothscroll.js';

let page = 1;
let infiniteScroll;

const scrollIsOnThreshold = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollDiff = scrollHeight - (scrollTop + clientHeight);
    const scrollIsBottom = scrollDiff <= 30;
    if (scrollIsBottom) page += 1;
    return scrollIsBottom;
};

const homePage = () => {
    // Modificando nodos
    getNode.headerSection.classList.remove('header-container--long');
    getNode.headerSection.style.background = '';
    getNode.arrowBtn.classList.add('inactive');
    getNode.arrowBtn.classList.remove('header-arrow--white');
    getNode.headerTitle.classList.remove('inactive');
    getNode.headerCategoryTitle.classList.add('inactive');
    getNode.searchForm.classList.remove('inactive');
    getNode.trendingPreviewSection.classList.remove('inactive');
    getNode.categoriesPreviewSection.classList.remove('inactive');
    getNode.genericSection.classList.add('inactive');
    getNode.movieDetailSection.classList.add('inactive');
    getNode.searchFormInput.value = '';
    // Limpiando contenido
    getNode.trendingMoviesPreviewList.innerHTML = '';
    getNode.categoriesPreviewList.innerHTML = '';
    // Obteniendo los datos a renderizar
    getData.trendingMoviesPreview();
    getData.categoriesMoviesPreview();
};

const trendsPage = () => {
    // Modificando nodos
    getNode.headerSection.classList.remove('header-container--long');
    getNode.headerSection.style.background = '';
    getNode.arrowBtn.classList.remove('inactive');
    getNode.arrowBtn.classList.remove('header-arrow--white');
    getNode.headerTitle.classList.add('inactive');
    getNode.headerCategoryTitle.classList.remove('inactive');
    getNode.searchForm.classList.add('inactive');
    getNode.trendingPreviewSection.classList.add('inactive');
    getNode.categoriesPreviewSection.classList.add('inactive');
    getNode.genericSection.classList.remove('inactive');
    getNode.movieDetailSection.classList.add('inactive');
    // Limpiando contenido
    getNode.headerCategoryTitle.textContent = 'Tendencias';
    getNode.genericSection.innerHTML = '';
    // Obteniendo los datos a renderizar
    getData.trendingMovies();
    // Scroll infinito
    infiniteScroll = () => {
        if (scrollIsOnThreshold()) getData.trendingMovies(page);
    };
};

const searchPage = () => {
    // Modificando nodos
    getNode.headerSection.classList.remove('header-container--long');
    getNode.headerSection.style.background = '';
    getNode.arrowBtn.classList.remove('inactive');
    getNode.arrowBtn.classList.remove('header-arrow--white');
    getNode.headerTitle.classList.add('inactive');
    getNode.headerCategoryTitle.classList.add('inactive');
    getNode.searchForm.classList.remove('inactive');
    getNode.trendingPreviewSection.classList.add('inactive');
    getNode.categoriesPreviewSection.classList.add('inactive');
    getNode.genericSection.classList.remove('inactive');
    getNode.movieDetailSection.classList.add('inactive');
    // Limpiando contenido
    getNode.genericSection.innerHTML = '';
    // Obteniendo los datos a renderizar
    const [, slug] = window.location.hash.split('=');
    const searchText = decodeURI(slug);
    getData.searchMoviesByText(searchText);
    // Scroll infinito
    infiniteScroll = () => {
        if (scrollIsOnThreshold()) getData.searchMoviesByText(searchText, page);
    };
};

const movieDetailsPage = () => {
    // Modificando nodos
    getNode.headerSection.classList.add('header-container--long');
    getNode.arrowBtn.classList.remove('inactive');
    getNode.arrowBtn.classList.add('header-arrow--white');
    getNode.headerTitle.classList.add('inactive');
    getNode.headerCategoryTitle.classList.add('inactive');
    getNode.searchForm.classList.add('inactive');
    getNode.trendingPreviewSection.classList.add('inactive');
    getNode.categoriesPreviewSection.classList.add('inactive');
    getNode.genericSection.classList.add('inactive');
    getNode.movieDetailSection.classList.remove('inactive');
    // Limpiando contenido
    getNode.headerSection.style.background = 'url("")';
    getNode.movieDetailTitle.innerText = '';
    getNode.movieDetailDescription.innerText = '';
    getNode.movieDetailScore.innerText = '';
    getNode.movieDetailCategoriesList.innerText = '';
    getNode.relatedMoviesContainer.innerHTML = '';
    // Obteniendo los datos a renderizar
    const [, slug] = window.location.hash.split('=');
    const [movieId] = slug.split('-');
    getData.movieById(movieId);
    getData.relatedMoviesById(movieId);
};

const categoriesPage = () => {
    // Modificando nodos
    getNode.headerSection.classList.remove('header-container--long');
    getNode.headerSection.style.background = '';
    getNode.arrowBtn.classList.remove('inactive');
    getNode.arrowBtn.classList.remove('header-arrow--white');
    getNode.headerTitle.classList.add('inactive');
    getNode.headerCategoryTitle.classList.remove('inactive');
    getNode.searchForm.classList.add('inactive');
    getNode.trendingPreviewSection.classList.add('inactive');
    getNode.categoriesPreviewSection.classList.add('inactive');
    getNode.genericSection.classList.remove('inactive');
    getNode.movieDetailSection.classList.add('inactive');
    // Limpiando contenido
    getNode.headerCategoryTitle.innerText = '';
    getNode.genericSection.innerHTML = '';
    // Obteniendo los datos a renderizar
    const [, slug] = window.location.hash.split('=');
    const [categoryId, categoryName] = slug.split('-');
    const categoryNameCapit = decodeURI(categoryName).replace(/\b\w/g, (l) => l.toUpperCase());
    const categoryText = document.createTextNode(categoryNameCapit);
    getNode.headerCategoryTitle.appendChild(categoryText);
    getData.moviesByCategory(categoryId);
    // Scroll infinito
    infiniteScroll = () => {
        if (scrollIsOnThreshold()) getData.moviesByCategory(categoryId, page);
    };
};

const error404 = () => {
    console.log('Recurso no encontrado');
};

const pages = [
    { name: 'trends', hashstart: '#trends', render: trendsPage },
    { name: 'search', hashstart: '#search=', render: searchPage },
    { name: 'movie', hashstart: '#movie=', render: movieDetailsPage },
    { name: 'category', hashstart: '#category=', render: categoriesPage },
];

const navigator = () => {
    // Reiniciamos la el almacenador infiniteScroll
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

    const { hash } = window.location;
    let rendering = hash === '' ? homePage : error404;
    const searchIndexRenderPage = pages.findIndex((el) => hash.startsWith(el.hashstart));
    if (searchIndexRenderPage !== -1) rendering = pages[searchIndexRenderPage].render;
    rendering();
    // Para el scroll top podemos usar:
    // window.scrollTo(0, 0);
    // O usar:
    // document.body.scrollTo = 0;
    // document.documentElement.scrollTo = 0;
    smoothscroll();

    // Argegamos el evento de infiniteScroll si en la sección se ha asignado
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
};

export default navigator;
