import * as types from "./actionTypes";

const INITIAL_STATE = {
    movies: {
        data: [],
        isLoading: false,
        error: null
    },
    favorites: []
};

function reducer(state = INITIAL_STATE, action) {
    console.log(state, action);

    switch (action.type) {
        case types.GET_MOVIES:
            return {
                ...state,
                movies: { ...INITIAL_STATE.movies, isLoading: true }
            };
        case types.GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: { ...INITIAL_STATE.movies, data: action.payload }
            };
        case types.GET_MOVIES_FAILURE:
            return {
                ...state,
                movies: { ...INITIAL_STATE.movies, error: action.payload }
            };
        case types.TOGGLE_FAVORITE:
            const toggleFavorite = (id) => {
                if (state.favorites.includes(id)) {
                    return state.favorites.filter((favorite) => favorite !== id);
                } else {
                    return state.favorites.concat(id);
                }
            };
            return {
                ...state, favorites: toggleFavorite(action.payload)
            };
        case types.GET_SINGLE_MOVIE:
            return {
                ...state,
                movies: { ...state.movies, isLoading: true }
            };
        case types.GET_SINGLE_MOVIE_SUCCESS:
            const hasMovie = !!state.movies.data.find(({ id }) => {
                return id = action.payload.id;
            });
            return {
                ...state,
                movies: { ...state.movies, data: hasMovie ? state.movies.data : state.movies.data.concat(action.payload), isLoading: false }
            };
        case types.GET_SINGLE_MOVIE_FAILURE:
            return {
                ...state,
                movies: { ...state.movies, error: action.payload, isLoading: false }
            };

        default:
            return state;
    }
}

export default reducer;