import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as movieActions from '../../store/movie';
import './MoviesPage.css';

function MoviesList({ data }) {
    const dispatch = useDispatch();
    
    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(movieActions.movieList())
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(movieActions.moviePoster())
    // }, [dispatch]);

    // const url = `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;

    return (
        <div className='movies-list-container'>
            {movies && movies.map((movie) => 
            <div className='movie-container'>
                <li className='movie-title'>{movie.title}</li>
                <li className='movie-id'>{movie.id}</li>
                <li className='movie-poster'><img src={movie.poster_path}/></li>
            </div>
            )}
        </div>
    )
}

export default MoviesList;