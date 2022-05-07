import navigator from './routes/navigations.js';
import * as getNode from './utils/getNode.js';

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
    if (textInput !== '') {
        window.location.hash = `#search=${textInput}`;
    } else {
        console.log('No hay nada que buscar!');
    }
});

getNode.trendingBtn.addEventListener('click', () => {
    window.location.hash = '#trends';
});

getNode.arrowBtn.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
});

getNode.categoriesPreviewList.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.nodeName === 'H3') {
        const categoryContainerNode = target.parentNode;
        const categoryID = categoryContainerNode.dataset.categoryid;
        const categoryName = categoryContainerNode.dataset.categoryname.toLowerCase();
        window.location.hash = `category=${categoryID}-${categoryName}`;
    }
});
