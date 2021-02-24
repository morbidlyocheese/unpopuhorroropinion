import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as movieActions from '../../store/movie';
import './MoviesPage.css';

function MoviesList() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);

    console.log('movies --->', movies)

    useEffect(() => {
        dispatch(movieActions.movieList())
    }, [dispatch]);

    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='movies-list-container'>
            <h1 className='discover-h1'>Discover</h1>
            {movies && movies.map((movie) => 
                <Link to={`/movies/details/${movie.id}`}>
                    <div className='movie-outer-container'>
                        <div className='poster-title'>
                            <div className='movie-title'>{movie.title}</div>
                            <div><img alt='movie-poster' className='movies-poster' src={baseUrl + movie.poster_path}/></div>
                        </div>
                        <div className='movie-inner-container'>
                            <div className='movie-bio'>{movie.overview}</div>
                            <div className='movie-vote'><p className='rating'>Rating: </p>{movie.vote_average}</div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default MoviesList;