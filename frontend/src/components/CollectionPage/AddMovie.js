import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './AddMovie.css';
import * as collectionActions from '../../store/collection';

function AddMovie() {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const collections = useSelector((state) => state.collection);
    const [collection, setCollection] = useState([]);

    // const userId = useSelector((state) => state.session.user.id);

    const [movie, addMovie] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(collectionActions.addToCollection({ collection: movieId }));
    }

    const handleChange = (e) => {
        setCollection({ value: e.target.value });
    }

    return (
        <div className='add-movie-container'>
            <form onSubmit={handleSubmit}>
                <select value={collection.value} onChange={handleChange}>
                    <option value={collections.name}>{collections.name}</option>
                </select>
                <button type='submit' className='add-movie-button'>Add To Collection</button>
            </form>
        </div>
    )
}

export default AddMovie;