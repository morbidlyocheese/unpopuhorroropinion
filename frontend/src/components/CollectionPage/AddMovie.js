import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './AddMovie.css';
import * as collectionActions from '../../store/collection';

function AddMovie() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const userId = useSelector((state) => state.session.user.id);
    const collections = useSelector((state) => state.collection.collections);
    const [collectionId, setCollectionId] = useState(0);

    const [responseHeader, setResponseHeader] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(collectionActions.addToCollection(id, collectionId, user.id))
            .then(response => {
                setResponseHeader(response);
                dispatch(collectionActions.getAllCollections());
            });
    }
    
    const onChange = (e) => { 
        setCollectionId(parseInt(e.target.value)); 
    }

    return (
        <div className='add-movie-container'>
            <form className='add-dropdown' onSubmit={handleSubmit}>
                <select className='add-dropdown' onChange={onChange} value={collectionId}>
                            <option className='add-dropdown' value='0' disabled={collectionId !== 0}>Select Collection</option>
                        {collections && collections.map((collection) => (
                            (collection.userId === userId) ? <option value={collection.id} key={collection.id}>{collection.name}</option> : <></>
                        ))}
                    </select>
                <button className='add-dropdown add-button' type='submit'>Add To Collection</button>
            </form>
            {responseHeader.length ? <h4 className='response-text'>{responseHeader}</h4> : null}
        </div>
    )
}

export default AddMovie;