// action type
const SEARCH_MOVIE = 'movie/search';

//  pojo action
const searchMovie = (movie) => {
    return {
        type: SEARCH_MOVIE,
        payload: movie
    }
}

// thunk action
export const fetchMovieInfo = (searchTerm) => async(dispatch) => {
    const res = await fetch(`/api/movies/search?searchTerm=${encodeURIComponent(searchTerm)}`);

    // destructure res
    const data = await res.json();
    const movie = data.results;

    // make dispatch action
    dispatch(searchMovie(movie));
}

// const initialState = { movie: null };

const searchReducer = (state=[], action) => {
    switch (action.type) {
        case SEARCH_MOVIE:
            return  action.payload;
        default:
            return state;
    }
}

export default searchReducer;