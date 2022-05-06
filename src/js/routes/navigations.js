import getData from '../utils/getData.js';
import * as getNode from '../utils/getNode.js';

const homePage = () => {
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

    getData.trendingMoviesPreview();
    getData.categoriesMoviesPreview();
};

const trendsPage = () => {
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

    getNode.headerCategoryTitle.innerHTML = 'Tendencias';
};

const searchPage = () => {
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
};

const movieDetailsPage = () => {
    getNode.headerSection.classList.add('header-container--long');
    // node.headerSection.style.background = '';
    getNode.arrowBtn.classList.remove('inactive');
    getNode.arrowBtn.classList.add('header-arrow--white');
    getNode.headerTitle.classList.add('inactive');
    getNode.headerCategoryTitle.classList.add('inactive');
    getNode.searchForm.classList.add('inactive');

    getNode.trendingPreviewSection.classList.add('inactive');
    getNode.categoriesPreviewSection.classList.add('inactive');
    getNode.genericSection.classList.add('inactive');
    getNode.movieDetailSection.classList.remove('inactive');
};

const categoriesPage = () => {
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

    const [, slug] = window.location.hash.split('=');
    const [categoryId, categoryName] = slug.split('-');

    const categoryNameCapit = `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;

    getNode.headerCategoryTitle.innerText = '';
    const categoryText = document.createTextNode(categoryNameCapit);
    getNode.headerCategoryTitle.appendChild(categoryText);

    getData.moviesByCategory(categoryId);
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
    const hash = window.location.hash;
    let rendering = hash === '' ? homePage : error404;
    const searchIndexRenderPage = pages.findIndex((page) => hash.startsWith(page.hashstart));
    if (searchIndexRenderPage !== -1) rendering = pages[searchIndexRenderPage].render;
    rendering();
};

export default navigator;
