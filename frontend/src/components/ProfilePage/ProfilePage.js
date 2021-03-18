import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './ProfilePage.css';
import * as collectionActions from '../../store/collection';
import NewCollectionPage from '../CollectionPage/NewCollection';

function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    let currentCollectionId = useParams();
    currentCollectionId = currentCollectionId.id;

    let currentUserId = useParams();
    currentUserId = currentUserId.id;
    currentUserId = parseInt(currentUserId);
    const userId = useSelector((state) => state.session.user.id);
    const sessionUser = useSelector(state => state.session.user);
    const collections = useSelector((state) => state.collection.collections);

    const userCollections = useSelector((state) => state.collection.userCollections);
    const collectionsUser = useSelector((state) => state.collection.user);
    const [collectionId, setCollectionId] = useState(0);

    let collectionUser;

    console.log('state ->', userCollections)

    const onChange = (e) => {
        setCollectionId(parseInt(e.target.value));
    }

    // maps through collections to set the collection user
    collections.map((collection) => {
        if (collection.userId === userId) {
            collectionUser = collection.userId;
        }
        return collectionUser;
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

    useEffect(() => {
        dispatch(collectionActions.getUserCollections(userId))
    }, [dispatch, userId]);
    
    return (
        <div className='profile-page-container'>
            <div className='new-delete-collection-container'>
                <NewCollectionPage />
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
            <div className='profile-inner-container'>
                <h1 className='collections'>{collectionsUser.username}'s Collections: </h1>
                {userCollections && userCollections.map((collection) => (
                    (collection.userId === currentUserId) ? <div className='profile-collection-name'>{collection.name}</div> : <></>
                ))}
            </div>
        </div>
    )
}

// (collection.userId === currentUserId) ? <div className='profile-collection-name'>{collection.name}</div> : <></>

export default ProfilePage;