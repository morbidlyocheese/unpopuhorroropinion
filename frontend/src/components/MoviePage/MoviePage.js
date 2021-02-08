import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as movieActions from '../../store/movie';

import * as moviesPage from './MoviesPage'

import './MoviePage.css';

function MoviePage() {
    const dispatch = useDispatch();
    // const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const movie = useSelector(state => state.movie);
    const { id } = useParams();

    useEffect(() => {
        dispatch(movieActions.movieDetails(id))
    }, [dispatch, id]);

    return (     
        <div className='movie-page-container'>
            <div className='movie-page-movieInfo'>
                <div className='movie-outer-container'>
                    <div className='movie-inner-container'>
                        <div className='movie-title'>{movie.title}</div>
                        <div className='movie-tagline'>{movie.tagline}</div>
                        <div className='movie-bio'>{movie.overview}</div>
                        <div className='movie-vote'>{movie.vote_average}</div>
                        <div className='movie-release-date'>{movie.release_date}</div>
                        <div className='movie-runtime'>{movie.runtime}</div>
                        <div className='movie-homepage'>{movie.homepage}</div>
                    </div>
                </div>
            </div>
        </div>       
        )
}

export default MoviePage;
