import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Search.css';

function SearchPage() {
    const history = useHistory();

    const movies = useSelector(state => state.search);

    console.log('movies-> ', movies)
    return (
        <div className='search-page-container'>
            <div className='search-page-movieInfo'>
                {movies && movies.map((movie) => (
                    <div>{movie.title}</div>
                    ))}
            </div>
        </div>
    )
}


export default SearchPage;