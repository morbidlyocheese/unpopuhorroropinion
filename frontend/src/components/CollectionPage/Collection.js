import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Collection.css';
import * as collectionActions from '../../store/collection';
import NewCollectionPage from './NewCollection';

function Collection() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector((state) => state.session.user.id);
    const collection = useSelector((state) => state.collection.movies);
    const sessionUser = useSelector(state => state.session.user);  
    const collections = useSelector((state) => state.collection.collections);
    const [collectionId, setCollectionId] = useState(0);

    let collectionUser;

    const onChange = (e) => {
        setCollectionId(parseInt(e.target.value));
    }

    // maps through collections to set the collection user
    collections.map((collection) => {
        if (collection.userId === userId) {
            return collectionUser = collection.userId;
        }
    })

    const handleCollectionDelete = (e) => {
        // e.preventDefault();
        
        // checks if the current user matches the user linked to collection
        // or if the user is an admin
        if (collectionUser === userId || sessionUser.username === 'admin') {
            dispatch(collectionActions.deleteCollection(collectionId, userId));
            history.push(`/movies/discover`)
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    return (
        <div>
            <div className='collection-outer-container'>
                <div className='new-delete-collection-container'>
                    <NewCollectionPage/>
                    <div className='delete-collection-container'>
                        <form className='delete-collection-form' onSubmit={handleCollectionDelete}>
                            <select className='delete-collection-dropdown delete-collection-select' onChange={onChange} value={collectionId}>
                                <option className='delete-collection-dropdown delete-collection-option' value='0' disabled={collectionId !== 0}>Select To Delete</option>
                                {collections && collections.map((collection) => (
                                    (collection.userId === userId) ? <option value={collection.id} key={collection.id}>{collection.name}</option> : <></>
                                ))}
                            </select>
                            <button className='delete-button' type='submit'>Delete Collection</button>
                        </form>
                    </div>
                </div>
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