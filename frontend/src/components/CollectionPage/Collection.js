import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './Collection.css';
import * as collectionActions from '../../store/collection';
import { useEffect } from 'react';

function Collection() {
    const dispatch = useDispatch();
    const history = useHistory();
    let currentCollectionId = useParams();
    currentCollectionId = currentCollectionId.id;
    currentCollectionId = parseInt(currentCollectionId);

    // const userId = useSelector((state) => state.session.user.id);
    let userId = useParams();
    userId = parseInt(userId.id);

    const user = useSelector((state) => state.collection.userId);
    // const collection = useSelector((state) => state);
    // const collection = useSelector((state) => state.collection.movies);
    const sessionUser = useSelector(state => state.session.user);  
    const collections = useSelector((state) => state.collection.userCollections);
    const collection = useSelector((state) => state.userCollections);

    let collectionUser;

    console.log('collections ->', currentCollectionId);
    console.log('userrrrrr ->', userId);

    useEffect(() => {
        dispatch(collectionActions.getCollection(userId, currentCollectionId));
    }, [dispatch, userId, currentCollectionId]);

    // // maps through collections to set the collection user
    // collections.map((collection) => {
    //     if (collection.userId === userId) {
    //         collectionUser = collection.userId;
    //     }
    //     return collectionUser;
    // })

    return (
        <div>
            <div className='collection-outer-container'>
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
                        (movie.success === undefined) ? <><li className='collection-list-item'>{movie.title}<button className='delete-movie-button' type='submit' onClick={() => {
                            if (collectionUser === user || sessionUser.username === 'admin') {
                                const movId = movie.id;
                                dispatch(collectionActions.delFromCollection(movId, collection, currentCollectionId, user));
                                history.push(`/collections/${currentCollectionId}`)
                            } else {
                                alert("You cannot delete things that aren't yours!");
                            }
                        }}>x</button></li></> : <></>
                    ))}
                </ul>
            </div>
        </div>
    )
}



export default Collection;