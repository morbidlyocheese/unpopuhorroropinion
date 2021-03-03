import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as collectionActions from '../../store/collection';

import './NewCollection.css';

function NewCollectionPage({ data }) {
    const userId = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch();

    const [input, setInput] = useState('');

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(collectionActions.newCollection({ name: input, userId }));
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to='/movies/discover'/>
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className='new-collection-container'>
            <form className='new-collection-form' onSubmit={handleSubmit}>
                <input type='text' name='collection' value={input} onChange={handleChange} className='new-collection-input' placeholder='Collection Name'/>
                <button type='submit' className='new-collection-button'>New Collection</button>
            </form>
        </div>
    )
}

export default NewCollectionPage;