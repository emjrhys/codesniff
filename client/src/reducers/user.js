import {
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    REQUEST_USER_INFO
} from '../constants/ActionTypes';

/**
 * Initial state for user which contains a dummy user and an empty array of codes.
 *
 * TODO: Not sure why we needed a dummy user, remove it?
 */
const initialState = {
    isRequesting: false,
    code: [],
    user: {
        username: 'John Doe',
        email: 'a@a.com',
        id: 0,
    },
};

/**
 * The user reducer handles 3 different actions:
 * 1. Request user info is called at the beginning of getUserInfo and it marks isRequesting to true.
 * 2. Get user success is called at the end of a successful getUserInfo and it populates the user 
 *    content as well as the user's codes.
 * 3. Get user failure is called at the end of a failed getUserInfo and it marks this request as a failure.
 */
export default function user(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isRequesting: true,
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

        default:
            return state;
    }
}
