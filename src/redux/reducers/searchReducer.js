let initialState = {
    searchVal : '',
}

function searchReducer(state = initialState, action) {
    let {type, payload} = action
    switch (type) {
        case "SEARCH_VALUE":
            return {
                ...state,
                searchVal : payload.searchVal
            }
        default:
            return {...state}
    }
}

export default searchReducer;
