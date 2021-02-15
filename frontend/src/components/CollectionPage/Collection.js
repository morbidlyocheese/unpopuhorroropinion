import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as movieActions from '../../store/movie';
import './Collection.css';

function Collection() {
    const dispatch = useDispatch();
    const collections = useSelector((state) => state.collection.collections);
    const movies = collections[0].movieId;
    // const [id, setId] = useState();

    // const baseUrl = 'https://image.tmdb.org/t/p/w500';
    // const movie = useSelector(state => state.movies);  
    // useEffect(() => {
    //     dispatch(movieActions.movieDetails(id))
    // }, [dispatch, id]);

    return (
        <div>
            <div className='collection-outer-container'>
                <div className='collection-inner-container'>
                    <div className='collection-case'>
                        <div className='collection-sleeve'>
                            <p className='collection-text'>Movie Title</p>
                        </div>
                    </div>
                    <div className='collection-bottom'/>
                </div>
            </div>
            <div className='collection-list-container'>
                <ul className='collection-list-items'>
                    {movies && movies.map((movie) => (
                        <li className='collection-list-item' key={movie}>{dispatch(movieActions.movieDetails(movie))}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Collection;