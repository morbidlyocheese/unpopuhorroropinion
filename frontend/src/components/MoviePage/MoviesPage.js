import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import * as movieActions from '../../store/movie';
import './MoviesPage.css';

function MoviesList() {
    const dispatch = useDispatch();
    const history = useHistory();

    
    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(movieActions.movieList())
    }, [dispatch]);

    // const url = `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='movies-list-container'>
            {movies && movies.map((movie) => 
                <div className='movie-outer-container' onClick={() => history.push(`/movies/${movie.id}`)}>
                <div><img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path}/></div>
                <div className='movie-inner-container'>
                    <div className='movie-title'>{movie.title}</div>
                    <div className='movie-bio'>{movie.overview}</div>
                    <div className='movie-vote'>{movie.vote_average}</div>
                </div>
            </div>
            )}
        </div>
    )
}

{/* <div className='movie-outer-container' onClick={() => history.push(`/${movie.id}`)}> */}

export default MoviesList;