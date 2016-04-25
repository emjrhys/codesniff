import {
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    REQUEST_USER_INFO
} from '../constants/ActionTypes';
import request from 'superagent';

/**
 * Begins the user request.
 */
export function getUserRequest() {
    return {
        type: REQUEST_USER_INFO,
    }
}

/**
 * Get user success assigns the retrieved data to the payload.
 * @param data
 */
export function getUserSuccess(data) {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

/** 
 * Get user failure marks the attempt as a failure.
 * @param err
 *
 * TODO: Don't think we need err, but maybe I'm wrong.
 */
export function getUserFailure(err) {
    return {
        type: GET_USER_FAILURE,
    }
}

/**
 * Get user info attempts to retrieve information about the user. 
 */
export function getUserInfo() {
    return function (dispatch) {
        
        dispatch(getUserRequest());

        return request
            .get('http://localhost:8000/app/users/me/')
            .set('Authorization', 'Token ' + localStorage.getItem('token'))
            .end(function(err, res) {
                if(err || !res.ok) {
                    dispatch(getUserFailure(err));
                } else {
                    dispatch(getUserSuccess(JSON.parse(res.text)));
                }
            });

    }
}
