import api from '../api'

const APP_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
    return async (dispatch, getState) => {

        const popularMovieApi = api.get(`/movie/popular?api_key=${APP_KEY}&language=en-US&page=1`)
        const topRatedApi = api.get(`/movie/top_rated?api_key=${APP_KEY}&language=en-US&page=1`)
        const upComingApi = api.get(`/movie/upcoming?api_key=${APP_KEY}&language=en-US&page=1`)

        let [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([popularMovieApi, topRatedApi, upComingApi])

        dispatch({
            type: 'GET_MOVIES_SUCCESS',
            payload: {popularMovies: popularMovies.data, topRatedMovies: topRatedMovies.data, upComingMovies: upComingMovies.data},
        })
    }
}

export const movieAction = {
    getMovies,
}
