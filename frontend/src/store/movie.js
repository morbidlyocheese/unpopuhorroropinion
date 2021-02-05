import React from 'react';
import { fetch } from './csrf';

const GET_MOVIES = 'movie/getMovies';
// const GET_MOVIE_POSTER = 'movie/moviePoster';

function getMovies(movies) {
    return {
        type: GET_MOVIES,
        payload: movies
    }
}

// function getPoster(movies) {
//     return {
//         type: GET_MOVIE_POSTER,
//         payload: movies
//     }
// }

export const movieList = () => async(dispatch) => {
    const res = await fetch('/api/movies/discover');
    // console.log('res->', res.data);
    dispatch(getMovies(res.data));
    return res;
}

// export const moviePoster = () => async(dispatch) => {
//     const res = await fetch('/api/posters');
//     console.log('res poster ->', res.data);
//     dispatch(getPoster(res.data));
//     return res;
// }

const movieReducer = (state = [], action) => {
    let newState;
    switch(action.type) {
        case GET_MOVIES:
            return action.payload;
        // case GET_MOVIE_POSTER:
        //     return action.payload;
        default:
            return state;
    }
}

export default movieReducer;