import { fetch } from './csrf';

const GET_COLLECTION = 'movie/collection';
const ADD_TO_COLLECTION = 'movie/collection';

function collection(collection) {
    return {
        type: GET_COLLECTION,
        payload: collection
    }
}

function add(movie) {
    return {
        type: ADD_TO_COLLECTION,
        payload: movie
    }
}

export const getCollection = (id) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}`);
    dispatch(getCollection(res.data.collection));
    return res;
}

export const addToCollection = (data) => async (dispatch) => {
    const { movieId } = data;
    const res = await fetch(`/api/collections/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            collectionId,
            movieId
        }),
    });
    dispatch(getCollection(res.data.collection));
}

const collectionReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION:
            return action.payload;
        case ADD_TO_COLLECTION:
            newState = [...state];
            newState.Collection.push(action.payload);
            return newState;
        default:
            return state;
    }
}

export default collectionReducer;