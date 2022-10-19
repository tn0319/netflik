let initialState = {
	popularMovies: [],
	topRatedMovies: [],
	upComingMovies: [],
	movieGnere: [],
	movieReviews: [], //*왜 object가 아닌 array 형식인지 
	relatedMovies: [],
	loading: true,
}

function movieReducer(state = initialState, action) {
	let { type, payload } = action
	switch (type) {
		case "GET_MOVIES_REQUEST":
			return {
				...state,
				loading: true
			}
		case "GET_MOVIES_FAILURE":
			return {
				...state,
				loading: false
			}
		case "GET_MOVIES_SUCCESS":
			return {
				...state,
				popularMovies: payload.popularMovies,
				topRatedMovies: payload.topRatedMovies,
				upComingMovies: payload.upComingMovies,
				movieGnere: payload.movieGnere,
				loading: false
			}
		case "GET_REVIEWS_SUCCESS":
			return {
				...state,
				movieReviews: payload.movieReviews,
				loading: false
			}
		case "GET_RELATED_SUCCESS":
			return {
				...state,
				relatedMovies: payload.relatedMovies,
			}
		default:
			return { ...state };
	}
}

export default movieReducer;
