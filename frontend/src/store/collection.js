import { fetch } from './csrf';

const GET_COLLECTION = 'movie/collection';

function getCollection(collection) {
    return {
        type: GET_COLLECTION,
        payload: collection
    }
}

export const  collection = (id) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}`);
    dispatch(getCollection(res.data.collection));
    return res;
}

const collectionReducer = (state = [], action) => {
    switch (action.type) {
        case GET_COLLECTION:
            return action.payload;
        default:
            return state;
    }
}

export default collectionReducer;