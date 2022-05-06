import navigator from './routes/navigations.js';
import * as getNode from './utils/getNode.js';

window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
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

getNode.searchFormBtn.addEventListener('click', () => {
    window.location.hash = '#search=';
});

getNode.trendingBtn.addEventListener('click', () => {
    window.location.hash = '#trends';
});

getNode.arrowBtn.addEventListener('click', () => {
    window.location.hash = '';
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
