import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Search.css';

function SearchPage() {
    const history = useHistory();

    const movies = useSelector(state => state.search);
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='search-page-container'>
            <div className='search-page-movieInfo'>
                {movies && movies.map((movie) => (
                    <div className='movie-outer-container' key={movie.title} onClick={() => history.push(`/movies/details/${movie.id}`)}>
                        <div><img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path} /></div>
                        <div className='movie-inner-container'>
                            <div className='movie-title'>{movie.title}</div>
                            <div className='movie-bio'>{movie.overview}</div>
                            <div className='movie-vote'>{movie.vote_average}</div>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}


export default SearchPage;