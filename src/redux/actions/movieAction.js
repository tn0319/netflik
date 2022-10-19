import api from '../api'

const APP_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });

            const popularMovieApi = api.get(`/movie/popular?api_key=${APP_KEY}&language=en-US&page=1`)
            const topRatedApi = api.get(`/movie/top_rated?api_key=${APP_KEY}&language=en-US&page=1`)
            const upComingApi = api.get(`/movie/upcoming?api_key=${APP_KEY}&language=en-US&page=1`)
            const gnereApi = api.get(`/genre/movie/list?api_key=${APP_KEY}&language=en-US`)

            let [popularMovies, topRatedMovies, upComingMovies, movieGnere] = await Promise.all([popularMovieApi, topRatedApi, upComingApi, gnereApi])

            dispatch({
                type: 'GET_MOVIES_SUCCESS',
                payload: { popularMovies: popularMovies.data.results, topRatedMovies: topRatedMovies.data.results, upComingMovies: upComingMovies.data.results, movieGnere: movieGnere.data.genres },
            })
        } catch (err) {
            dispatch({ type: "GET_MOVIES_FAILURE" });
        }
    }
}

function getReviews(id) {
    return async (dispatch, getState) => {
        try {
            const reviewList = await api.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${APP_KEY}&language=en-US&page=1`)

            dispatch({
                type: 'GET_REVIEWS_SUCCESS',
                payload: {
                    movieReviews: reviewList.data.results
                }
            })
        }
        catch (err) {
            console.log("Error.. Can't get Reviews")
        }
    }
}

function getRelatedMovies(id) {
    return async (dispatch, getState) => {
        try {
            const relatedMovieList = await api.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APP_KEY}&language=en-US&page=1`)

            dispatch({
                type: 'GET_RELATED_SUCCESS',
                payload: {
                    relatedMovies: relatedMovieList.data.results
                }
            })
        }
        catch (err) {
            console.log("Error.. Can't get related Movies")
        }
    }
}

export const movieAction = {
    getMovies,
    getReviews,
    getRelatedMovies,
}
