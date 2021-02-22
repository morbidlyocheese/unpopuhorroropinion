import React from 'react';
import { useSelector } from 'react-redux';

import './Collection.css';

function Collection() {
    const coll = useSelector((state) => state.collection.collections[0])
    const collection = useSelector((state) => state.collection.movies);

    return (
        <div>
            <div className='collection-outer-container'>
                <h1 className='collection-name'>{coll.name}:</h1>
                <div className='collection-inner-container'>
                    {collection && collection.map((movie, i) => (
                        (movie.success === undefined) ? <div className='collection-case'><div className='collection-sleeve'><p className='collection-text'>{movie.title}</p></div></div> : <></>
                    ))}
                    <div className='collection-bottom'/>
                </div>
            </div>
            <div className='collection-list-container'>
                <ul className='collection-list-items'>
                    <p className='movie-titles'>Collection Titles:</p>
                    {collection && collection.map((movie, i) => (
                        (movie.success === undefined) ? <li className='collection-list-item'>{movie.title}</li> : <></>
                    ))}
                </ul>
            </div>
        </div>
    )
}



export default Collection;