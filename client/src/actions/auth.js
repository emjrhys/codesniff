import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../constants/ActionTypes.js';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';
import request from 'superagent';

export function checkSession() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('token');
    if(token !== null && username !== null) {
        return {
            type: LOGIN_USER_SUCCESS,
            payload: {
                token: token,
                username: username
            }
        }
    }
    else {
        return {
            type: LOGIN_USER_FAILURE,
            payload: {
                status: 404,
                statusText: 'No session',
            }
        }
    }
}

export function loginUserSuccess(token, username) {

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            username: username
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
   
    return function(dispatch) {
        
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
            
                    if(err || !res.ok) {
                        console.log('failure');
                        dispatch(signupFailure());               
                    }
                    else {
                        dispatch(signupSuccess);
                        dispatch(loginUser(username, password, redirect));
                    }

                });
        }
    }
}

export function loginUser(username, password, redirect="/") {
    return function (dispatch) {
        
        dispatch(loginUserRequest());

        return request
            .post('http://localhost:8000/api-token-auth/', {
                    username: username,
                    password: password
            })
            .end(function(err, res) {
                
                if(err || !res.ok) {
                    dispatch(loginUserFailure(err));
                    dispatch(pushState(null, '/login'));
                }
                else {

                    let token = (JSON.parse(res.text)).token;

                    dispatch(loginUserSuccess(token, username));
                    console.log(redirect);
                    dispatch(pushState(null, redirect));
                }
            });

    }
}
