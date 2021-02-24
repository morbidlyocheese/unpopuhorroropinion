import { fetch } from './csrf';

const GET_MOVIES = 'movie/getMovies';
const GET_MOVIE = '/movie/getMovie';

function getMovies(movies) {
    return {
        type: GET_MOVIES,
        payload: movies
    }
}

function getMovie(movie) {
    return {
        type: GET_MOVIE,
        payload: movie
    }
}

export const movieList = () => async(dispatch) => {
    const res = await fetch('/api/movies/discover');
    console.log(res.data)
    dispatch(getMovies(res.data));
    return res;
}

export const movieDetails = (id) => async(dispatch) => {
    const res = await fetch("/api/movies/details/"+id);
    dispatch(getMovie(res.data));
    return res;
}

const movieReducer = (state = [], action) => {
    switch(action.type) {
        case GET_MOVIES:
            return action.payload;
        case GET_MOVIE:
            return action.payload;
        default:
            return state;
    }
}

export default movieReducer;