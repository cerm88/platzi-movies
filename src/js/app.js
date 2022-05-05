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
