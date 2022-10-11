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
                payload: {popularMovies: popularMovies.data, topRatedMovies: topRatedMovies.data, upComingMovies: upComingMovies.data, movieGnere : movieGnere.data.genres },
            })
        } catch (err) {
            dispatch({ type: "GET_MOVIES_FAILURE" });
        }
    }
}

export const movieAction = {
    getMovies,
}
