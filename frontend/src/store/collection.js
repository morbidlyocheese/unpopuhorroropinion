import { fetch } from './csrf';

const GET_COLLECTION = 'movie/collection';
const GET_ALL_COLLECTIONS = 'movie/collections';

const ADD_TO_COLLECTION = 'movie/add';
const GET_MOVIES = 'movies/collection';

function collection(collection) {
    return {
        type: GET_COLLECTION,
        payload: collection
    }
}

function collections(collections) {
    return {
        type: GET_ALL_COLLECTIONS,
        payload: collections
    }
}

function movies(movies) {
    return {
        type: GET_MOVIES,
        payload: movies
    }
}

// function add(movie) {
//     return {
//         type: ADD_TO_COLLECTION,
//         payload: movie
//     }
// }

// single collection
export const getCollection = (collectionId) => async (dispatch) => {
    const res = await fetch(`/api/collections/${collectionId}`);
    dispatch(collection(res.data.collectionOne.id));
    console.log('res ->', res)
    dispatch(movies(res.data.movie));

    return res;
}

export const getAllCollections = () => async (dispatch) => {
    const res = await fetch(`/api/collections`);
    dispatch(collections(res.data.collections));
    return res;
}

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
    // dispatch(getCollection(res.data.collections));
}

const collectionReducer = (state = { collection: [], collections: [] }, action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION:
            return {...state, collection: action.payload};
        case ADD_TO_COLLECTION:
            newState = {...state};
            newState.collection.push(action.payload);
            return newState;
        case GET_ALL_COLLECTIONS:
            return {...state, collections: action.payload};
        case GET_MOVIES:
            return {...state, movies: action.payload};
        default:
            return state;
    }
}

export default collectionReducer;