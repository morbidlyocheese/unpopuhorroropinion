import React from 'react';
import { useSelector } from 'react-redux';
// import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
// import * as movieActions from '../../store/movie';

import './Search.css';

function SearchPage() {
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const { id } = useParams();

    const movies = useSelector(state => state.search);
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className='search-page-container'>
            <div className='search-page-movieInfo'>
                {movies && movies.map((movie) => (
                    <>
                        <Link to={`/movies/details/${movie.id}`}>
                            <img alt='movie-poster' className='movie-poster' src={baseUrl + movie.poster_path} />
                            <div className='movie-title'>{movie.title}</div>
                            <div className='movie-bio'>{movie.overview}</div>
                            <div className='movie-vote'>Rating: {movie.vote_average}</div>
                        </Link>
                    </>
                ))}
            </div>
        </div>
    )
}


export default SearchPage;