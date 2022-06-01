import intersectionObserverIsSupported from '../constants/consts.js';
import requestError from './requestError.js';
import { likeMovieList } from './getNode.js';
import registerImage from './lazyLoading.js';

// Segunda forma de agregar una imagen con contenedor
// Pero esta vez con una estructura httml y con el botón like pulsado
function addImageContainerLiked({ nodeContainer, movieId, movieURL, movieAlt, movieName }) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const attbImg = intersectionObserverIsSupported
        ? `data-src="${movieURL}" data-alt="${movieAlt}"`
        : `src="${movieURL}" alt="${movieAlt}"`;

    movieContainer.innerHTML = `
        <img class="movie-img fade-in"
            data-movieid="${movieId}"
            ${attbImg}
            data-moviename="${movieName}"
        >
        <button class="btn-like btn-like--like"></button>
    `
        .replace(/\/?>\n\s*</, '><')
        .trim();
    nodeContainer.appendChild(movieContainer);
    return movieContainer;
}

export const likeMovies = (dataMovie, isLiked = true) => {
    try {
        const { movieid: idEntry, src, alt, moviename } = dataMovie;
        const dataMoviesParsed = JSON.parse(window.localStorage.getItem('datamovies')) || [];
        const indexLikedMovie = dataMoviesParsed
            ? dataMoviesParsed.map((movie) => movie.movieid).indexOf(idEntry)
            : -1;

        if (isLiked) {
            // No existe la movie en el storage
            if (indexLikedMovie === -1) {
                // Guardando movie en el storage
                dataMoviesParsed.push(dataMovie);
                const dataMoviesJson = JSON.stringify(dataMoviesParsed);
                window.localStorage.setItem('datamovies', dataMoviesJson);
                // Guardando movie en la sección de favoritos
                const container = addImageContainerLiked({
                    nodeContainer: likeMovieList,
                    movieId: idEntry,
                    movieURL: src,
                    movieAlt: alt,
                    movieName: moviename,
                });
                // Agregando imagen al observador
                if (intersectionObserverIsSupported) registerImage(container);
            }
        }

        if (!isLiked) {
            // No existe la movie en el storage
            if (indexLikedMovie !== -1) {
                // Eliminando movie del storage
                dataMoviesParsed.splice(indexLikedMovie, 1);
                const dataMoviesJson = JSON.stringify(dataMoviesParsed);
                window.localStorage.removeItem('datamovies');
                const totalMovies = dataMoviesParsed.length;
                if (totalMovies !== 0) window.localStorage.setItem('datamovies', dataMoviesJson);
                // Eliminando movie del DOM
                const movieList = likeMovieList.childNodes;
                movieList.forEach((movieContainer) => {
                    const nodeImg = movieContainer.firstChild;
                    const { movieid: idSearch } = nodeImg.dataset;
                    if (idSearch === idEntry) movieContainer.remove();
                });
                // TODO: Actualizar like del contenedor de origen
            }
        }
    } catch (error) {
        requestError(error);
    }
};

export const likedMoviesTofavou = () => {
    try {
        const dataMoviesParsed = JSON.parse(window.localStorage.getItem('datamovies')) || [];
        dataMoviesParsed.forEach((dataMovie) => {
            const { movieid: idEntry, src, alt, moviename } = dataMovie;
            const container = addImageContainerLiked({
                nodeContainer: likeMovieList,
                movieId: idEntry,
                movieURL: src,
                movieAlt: alt,
                movieName: moviename,
            });
            // Agregando imagen al observador
            if (intersectionObserverIsSupported) registerImage(container);
        });
    } catch (error) {
        requestError(error);
    }
};
