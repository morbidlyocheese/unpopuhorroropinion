import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as collectionActions from '../../store/collection';
import './Navigation.css';

function CollectionDropdown() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const collections = useSelector((state) => state.collection.collections);
    const [collectionId, setCollectionId] = useState(0);

    console.log('user --> ', userId)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(collectionActions.getCollection(userId, collectionId))
        history.push(`/users/${userId}/collections/${collectionId}`)
    }
    
    useEffect(() => {

    })

    const onChange = (e) => {
        setCollectionId(parseInt(e.target.value));
    }

    return (
        <form className='collection-form' onSubmit={handleSubmit} >
            <select className='collection-dropdown collection-select' onChange={onChange} value={collectionId}>
                <option className='collection-dropdown collection-option' value='0' disabled={collectionId !== 0}>View Collection</option>
                {collections && collections.map((collection) => (
                    (collection.userId === userId) ? <option value={collection.id} key={collection.id}>{collection.name}</option> : <></>
                ))}
            </select>
            <button className='collection-dropdown collection-button' type='submit'>Go</button>
        </form>
    )
}

export default CollectionDropdown;