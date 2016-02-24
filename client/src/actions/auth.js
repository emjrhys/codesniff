import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../constants/ActionTypes.js';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';
import request from 'superagent';


export function loginUserSuccess(token) {

    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }

}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(pushState(null, '/login'));
    }
}

export function signupRequest() {
    return {
        type: SIGNUP_REQUEST
    }
}

export function signupSuccess() {
    return {
        type: SIGNUP_SUCCESS
    }
}

export function signupFailure() {
    return {
        type: SIGNUP_FAILURE
    }
}

export function signup(username, email, password, confirmPassword, redirect="/") {
    
    if(password !== confirmPassword) {
        dispatch(signupFailure());
    }
    else {

        dispatch(signupRequest());

        return request
            .post('http://localhost:8000/app/users/', {
                username,
                email,
                password
            })
            .end(function(err, res) {
            
                if(res && res.status === '404') {
                    dispatch(signupFailure());               
                }
                else {
                    dispatch(signupSuccess);
                    dispatch(loginUser(email, password, redirect));
                }

            });
    }
}

export function loginUser(email, password, redirect="/") {
    return function (dispatch) {
        
        dispatch(loginUserRequest());

        return request
            .post('http://localhost:8000/app/api-token-auth/', {
                    email: email,
                    password: password
            })
            .end(function(err, res) {
                
                if(res && res.status === '404') {
                    dispatch(loginUserFaiure(err));
                    dispatch(pushState(null, '/login'));
                }
                else {

                    let decoded = jwtDecode(res.token);
                    dispatch(loginUserSuccess(res.token));
                    dispatch(pushState(null, redirect));

                }
            });

    }
}
