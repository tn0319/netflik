let initialState = {
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    movieGnere: [],
    loading: true,
}

function movieReducer(state=initialState, action) {
    let { type, payload } = action
    switch (type) {
        case "GET_MOVIES_REQUEST":
            return {
                ...state,
                loading : true
            }
        case "GET_MOVIES_FAILURE":
            return {
                ...state,
                loading : false
            }
        case "GET_MOVIES_SUCCESS":
            return {
                ...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upComingMovies: payload.upComingMovies,
                movieGnere: payload.movieGnere,
                loading : false
            }
        default:
            return { ...state };
    }
}

export default movieReducer;
