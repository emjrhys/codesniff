import { combineReducers } from 'redux';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants/ActionTypes.js';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });

        case LOGIN_USER_SUCCESS:
            console.log('success');
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                userName: action.payload.username,
                statusText: 'Successful login'
            });

        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: 'Login failed'
            });

        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: 'Successful logout'
            });
        default:
            return state;
    }
}
