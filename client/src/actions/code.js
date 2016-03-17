import { ADD_CODE, REQUEST_CODE, RECEIVE_CODE, SELECT_CODE, SUBMIT_CODE } from '../constants/ActionTypes';
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
                }
                else {
                    var data = JSON.parse(res.text);
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

export function submitCode(userid, code, codesmells) {
    return function (dispatch) {

        return request
            .post('http://localhost:8000/app/submit/', {
                creator: userid,
                code: JSON.stringify(code),
                smells: JSON.stringify(codesmells)
            }) 
            .set('Accept', 'application/json')
            .end(function(err, res) {
                console.log(res);
                if(res && (res.status === 400 || res.status === 404 || res.status === 500)) {
                    console.log("submit code failure...");
                } else {
                    console.log("submit code success!");
                    var data = JSON.parse(res.text);
                    localStorage.setItem("codeid", data.id);
                }
            });
    }   
} 