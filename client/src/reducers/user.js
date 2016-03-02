import {
    REQUEST_USER_INFO,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    isRequesting: false,
    user: {
        username: 'John Doe',
    },
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isRequesting: true,
            });

        case GET_USER_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                user: action.payload,
            });
        case GET_USER_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
            });

        default:
            return state;
    }
}
