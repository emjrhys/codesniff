import {
    REQUEST_USER_INFO,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    SEND_USER
} from '../constants/ActionTypes';
import request from 'superagent';


export function getUserRequest() {
    return {
        type: REQUEST_USER_INFO,
    }
}

export function getUserSuccess(data) {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

export function getUserFailure(err) {
    return {
        type: GET_USER_FAILURE,
    }
}

export function getUserInfo() {
    return function (dispatch) {
        
        dispatch(getUserRequest());

        return request
            .get('http://localhost:8000/app/users/me/')
            .set('Authorization', 'Token ' + localStorage.getItem('token'))
            .end(function(err, res) {
                if(err || !res.ok) {
                    dispatch(getUserFailure(err));
                }
                else {
                    dispatch(getUserSuccess(JSON.parse(res.text)));
                }
            });

    }
}

export function sendUser(userid) {
    return {
        type: SEND_USER,
        payload: {
            userid: userid
        }
    }
}
