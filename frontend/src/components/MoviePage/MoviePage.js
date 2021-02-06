import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as movieActions from '../../store/movie';

import './MoviePage.css';

function MoviePage() {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    const movie = useSelector(state => state.movie);

    return (
        <div className='movie-page-container'>
            <div className='movie-page-movieInfo'>
                <div className='movie-outer-container'>
                    <div className='movie-inner-container'>
                        {/* <div className='movie-title'>{movie.title}</div>
                        <div className='movie-tagline'>{movie.tagline}</div>
                        <div className='movie-bio'>{movie.overview}</div>
                        <div className='movie-vote'>{movie.vote_average}</div>
                        <div className='movie-release-date'>currentMmovie.release_date}</div>
                        <div className='movie-runtime'>{movie.runtime}</div>
                        <div className='movie-homepage'>{movie.homepage}</div>
                        <div className='movie-genres'>{movie.genres.map((genre) => genre.name)}</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div><img alt='movie-poster' className='movie-poster' src={baseUrl + currentMovie.poster_path} /></div> */}


export default MoviePage;