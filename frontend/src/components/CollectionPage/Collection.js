import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import './Collection.css';
import * as collectionActions from '../../store/collection';
import NewCollectionPage from './NewCollection';

function Collection() {
    const dispatch = useDispatch();
    const collectionId = useParams();

    const user = useSelector((state) => state.session.user)
    const coll = useSelector((state) => state.collection.collections);
    const collection = useSelector((state) => state.collection.movies);
    const userId = useSelector((state) => state.session.user.id);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(collectionActions.deleteCollection(collectionId))
    }, [dispatch, collectionId]);

    const [redirect, setRedirect] = useState(false);

    const handleCollectionDelete = (e) => {
        e.preventDefault();

        if (collection.userId === sessionUser.id || sessionUser.username === 'admin') {
            dispatch(collectionActions.deleteCollection(collectionId, userId));
            setRedirect(true);
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    return (
        <div>
            <div className='collection-outer-container'>
                <NewCollectionPage/>
                <button className='delete-button' onClick={handleCollectionDelete}>Delete</button>
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