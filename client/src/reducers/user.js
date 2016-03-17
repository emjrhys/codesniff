import {
    REQUEST_USER_INFO,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    SEND_USER
} from '../constants/ActionTypes';

const initialState = {
    isRequesting: false,
    code: [],
    user: {
        username: 'John Doe',
        email: 'a@a.com',
        id: 0,
    },
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isRequesting: true
            });

        case GET_USER_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                user: action.payload.user,
                code: action.payload.code
            });
        case GET_USER_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false
            });
        case SEND_USER:
            return Object.assign({}, state, {
                userid: action.payload.userid
            });

        default:
            return state;
    }
}
