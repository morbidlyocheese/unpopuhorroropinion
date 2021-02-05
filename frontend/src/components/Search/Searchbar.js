import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMovieInfo } from '../../store/search';

import './Searchbar.css';

function SearchBar() {
    const [search, setSearch] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchMovieInfo(search));
        history.push('/movies/search');
    }

    return (
        <form className='navbar-search-form' onSubmit={handleSubmit}>
            <input className='navbar-search-input' placeholder='Search' type='text' name='searchTerm' onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button className='navbar-search-submit' type='submit'>Search</button>
        </form>
    )
}

export default SearchBar;