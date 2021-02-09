import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Search.css';

function SearchPage() {
    const movies = useSelector(state => state.search);
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='search-page-container'>
                {movies && movies.map((movie) => (
                    <div className='search-inner'>
                        <Link className='search-inner' to={`/movies/details/${movie.id}`}>
                            <div className='poster-container'>
                                <div className='movie-title'>{movie.title}</div>
                                <img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path} />
                            </div>
                            <div className='details-container'>
                                <div className='movie-bio'>{movie.overview}</div>
                                <div className='vote'>
                                    <div className='movie-vote'>
                                    <p>Rating: </p>{movie.vote_average}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    )
}


export default SearchPage;