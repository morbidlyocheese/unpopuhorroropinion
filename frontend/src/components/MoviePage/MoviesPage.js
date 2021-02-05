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

    // const url = `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='movies-list-container'>
            {movies && movies.map((movie) => 
            <div className='movie-outer-container'>
                <div><img className='movie-poster' src={baseUrl + movie.poster_path}/></div>
                <div className='movie-inner-container'>
                    <div className='movie-title'>{movie.title}</div>
                    <div className='movie-bio'>{movie.overview}</div>
                    <div className='movie-vote'>{movie.vote_average}</div>
                </div>
                {/* <div className='movie-id'>{movie.id}</div> */}
            </div>
            )}
        </div>
    )
}

export default MoviesList;