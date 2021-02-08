import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import MoviePage from './MoviePage';

import * as movieActions from '../../store/movie';
import './MoviesPage.css';

function MoviesList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    
    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(movieActions.movieList())
    }, [dispatch]);

    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    const handleClick = (e) => {
        const clicked = e.target;
        const clickedValue = e.target.key;
        console.log('clicked ->', clicked);
        console.log('clicked movie ->', clickedValue);
    }

    return (
        <div className='movies-list-container'>
            {movies && movies.map((movie) => 
                <div className='movie-outer-container' key={movie} onClick={handleClick}>
                <div><img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path}/></div>
                <div className='movie-inner-container'>
                    <div className='movie-title'>{movie.title}</div>
                    <div className='movie-bio'>{movie.overview}</div>
                    <div className='movie-vote'>{movie.vote_average}</div>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
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
                    </Modal>
                )}
            </div>
            )}
        </div>
    )
}

export default MoviesList;