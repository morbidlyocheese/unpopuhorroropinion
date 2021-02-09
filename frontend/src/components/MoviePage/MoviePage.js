import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as movieActions from '../../store/movie';

import './MoviePage.css';

function MoviePage() {
    const dispatch = useDispatch();
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const movie = useSelector(state => state.movies);
    const { id } = useParams();

    useEffect(() => {
        dispatch(movieActions.movieDetails(id))
    }, [dispatch, id]);

    return (     
        <div className='movie-outer-container'>
            <div className='movie-inner1-container'>
                <div className='movie-title'>{movie.title}</div>
                <div className='movie-tagline'>{movie.tagline}</div>
                <img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path} />
                    <div className='movie-release-date'>
                    <p className='movie-text'>Release Date: </p>{movie.release_date}</div>
                    <div className='movie-runtime'>
                    <p className='movie-text'>Runtime: </p>{movie.runtime}</div>
            </div>
            <div className='movie-inner2-container'>
                <div className='movie-bio'>{movie.overview}</div>
                <div className='movie-inner3-container'>
                    <div className='movie-vote'>
                    <p className='movie-text'>Vote Average: </p>{movie.vote_average}</div>
                    <div className='movie-homepage'>
                    <p className='movie-text'>Homepage: </p><a href={movie.homepage}>Link</a></div>
                </div>
            </div>
        </div>
        )
}

export default MoviePage;
