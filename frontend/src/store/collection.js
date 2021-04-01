import { fetch } from './csrf';

const GET_COLLECTION = 'movie/collection';
const GET_ALL_COLLECTIONS = 'movie/collections';

const ADD_TO_COLLECTION = 'movie/add';
const GET_MOVIES = 'movies/collection';
const DEL_MOVIE = 'movie/delete';

const CREATE_COLLECTION = 'collection/createCollection';
const REMOVE_COLLECTION = 'collection/removeCollection';

const COLLECTION_USER = 'collection/user';
const USER_COLLECTIONS = 'collections/user';

function collection(collection) {
    return {
        type: GET_COLLECTION,
        payload: collection
    }
}

function getCollectionUser(user) {
    return {
        type: COLLECTION_USER,
        payload: user
    }
}

function collections(collections) {
    return {
        type: GET_ALL_COLLECTIONS,
        payload: collections
    }
}

function userCollections(userCollections) {
    return {
        type: USER_COLLECTIONS,
        payload: userCollections
    }
}

function movies(movies) {
    return {
        type: GET_MOVIES,
        payload: movies
    }
}

function delMovie(movie) {
    return {
        type: DEL_MOVIE,
        payload: movie
    }
}

function createCollection(collection) {
    return {
        type: CREATE_COLLECTION,
        payload: collection
    }
}

function removeCollection(collection) {
    return {
        type: REMOVE_COLLECTION,
        payload: collection
    }
}

// get single collection
export const getCollection = (userId, collectionId, collectionUser) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/collections/${collectionId}`);
    console.log('res ->', res.data)
    dispatch(collection(res.data.userCollection, collectionUser));
    dispatch(getCollectionUser(res.data.userId));
    dispatch(movies(res.data.movieIds));
    return res;
}

//  get users collections
export const getUserCollections = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/profile`);
    dispatch(userCollections(res.data.userCollections));
    dispatch(getCollectionUser(res.data.profile));
    console.log('res ->', res.data)
    return res;
}


// get all collections
// export const getAllCollections = () => async (dispatch) => {
//     const res = await fetch(`/api/collections`);
//     dispatch(collections(res.data.collections));
//     return res;
// }

// add movie to collection
export const addToCollection = (movieId, collectionId, userId) => async (dispatch) => {
    const res = await fetch(`/api/collections/${collectionId}?movie=${movieId}`, {
        method: 'POST',
        body: JSON.stringify({
            collection: collectionId,
            movie: movieId,
            user: userId,
        }),
    });

    if (res.data.success) {
        return 'Success!';
    } else {
        return res.data.reason;
    }
}

// delete movie from collection
export const delFromCollection = (movieId, movieIds, collectionId, userId) => async (dispatch) => {
    const res = await fetch(`/api/collections/${collectionId}?movie=${movieId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            collection: movieIds,
            currentCollectionId: collectionId,
            movId: movieId,
            userId: userId,
        }),
    });

    if (res.data.success) {
        dispatch(delMovie(res));
        return 'Success!';
    } else {
        return res.data.reason;
    }
}

// new collection
export const newCollection = (data) => async (dispatch) => {
    const { name, userId } = data;
    const res = await fetch('/api/collections/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            userId
        }),
    });
    return dispatch(createCollection(res.data.collection));
}

// delete collection
export const deleteCollection = (collectionId, userId) => async (dispatch) => {
    const res = await fetch(`/api/collections/`, {
        method: 'DELETE',
        body: JSON.stringify({
            collectionId,
            userId
        })
    });
    dispatch(removeCollection(res));
    return res;
}

const collectionReducer = (state = { userCollection: {}, collections: [], userCollections: [], user: {}, movieIds: [] }, action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION:
            return {...state, userCollection: action.payload};
        case USER_COLLECTIONS:
            return {...state, userCollections: action.payload};
        case COLLECTION_USER:
            return {...state, user: action.payload};
        case ADD_TO_COLLECTION:
            newState = {...state};
            newState.collection.push(action.payload);
            return newState;
        case GET_ALL_COLLECTIONS:
            return {...state, collections: action.payload};
        case GET_MOVIES:
            return {...state, movies: action.payload};
        case CREATE_COLLECTION:
            return {...state, collection: action.payload};
        case REMOVE_COLLECTION:
            newState = Object.assign({}, state);
            newState.collection = null;
            return newState;
        case DEL_MOVIE:
            newState = Object.assign({}, state);
            newState.collection = null;
            return newState;        
        default:
            return state;
    }
}

export default collectionReducer;