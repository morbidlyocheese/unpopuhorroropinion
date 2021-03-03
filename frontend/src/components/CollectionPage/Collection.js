import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import './Collection.css';
import * as collectionActions from '../../store/collection';
import NewCollectionPage from './NewCollection';

function Collection() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)
    const collId = useSelector((state) => state.collection.collection);
    const collection = useSelector((state) => state.collection.movies);
    const userId = useSelector((state) => state.session.user.id);
    const sessionUser = useSelector(state => state.session.user);  
    const collections = useSelector((state) => state.collection.collections);
    const [collectionId, setCollectionId] = useState(0);

    console.log('collection ->', collections);
    console.log('coll id & userId ->', collectionId, userId);

    const onChange = (e) => {
        setCollectionId(parseInt(e.target.value));
    }

    const handleCollectionDelete = (e) => {
        e.preventDefault();
        
        if (collectionId.userId === sessionUser.id || sessionUser.username === 'admin') {
            dispatch(collectionActions.deleteCollection(collectionId, userId));
            history.push(`/collections/`)
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }


    return (
        <div>
            <div className='collection-outer-container'>
                <NewCollectionPage/>
                <form className='delete-collection-form' onSubmit={handleCollectionDelete}>
                    <select className='delete-collection-dropdown delete-collection-select' onChange={onChange} value={collectionId}>
                        <option className='delete-collection-dropdown delete-collection-option' value='0' disabled={collectionId !== 0}>Select To Delete</option>
                        {collections && collections.map((collection) => (
                            <>
                                <option value={collection.id} key={collection.id}>{collection.name}</option>
                            </>
                        ))}
                    </select>
                    <button className='delete-button' type='submit'>Delete Collection</button>
                </form>
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