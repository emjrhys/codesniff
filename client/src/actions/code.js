import { ADD_CODE, REQUEST_CODE, RECEIVE_CODE, SELECT_CODE } from '../constants/ActionTypes';
import request from 'superagent';


function requestCode(id) {

    return {
        type: REQUEST_CODE,
        isFetching: true,
        codeId: id
    }

}

function receiveCode(json) {

    return {
        type: RECEIVE_CODE,
        isFetching: false,
        code: json
    }

}


export function fetchCode(id) {

    return function (dispatch) {
     
        dispatch(requestCode(id));
        console.log("TOKEN: " + localStorage.getItem('token'));        

        // If I add the token, it fails the OPTIONS request
        return request
            .get('http://localhost:8000/app/codes/' + id)
            .end(function(err, res) {
                console.log(res);
                if(res && res.status === 404) {
                    console.log("FAILURE: " + res.text);
                    //reject();
                }
                else {
                    var data = JSON.parse(res.text);
                    console.log(data);
                    dispatch(receiveCode(data));
                
                }
            
            });
    }
}

export function addCode(json) {

    return function (dispatch) {
    
        dispatch(sendCode());

        return request
            .post('http://localhost:8000/app/codes/', json)
            .end(function(err, res) {
            
                dispatch(confirmCode());
            
            });

    }

}

export function selectCode(num, codesmell) {

    return {
        type: SELECT_CODE, 
        payload: {
            lineNumber: num, 
            codeSmellName: codesmell
        }
    }
}
