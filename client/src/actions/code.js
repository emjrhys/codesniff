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
        return request
            .get('http://localhost:8000/app/codes/' + id)
            .end(function(err, res) {
            
                if(res && (res.status === '404' || res.status === '301')) {
                    reject();
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

export function selectCode(num, id) {
    return {
        type: SELECT_CODE, 
        payload: {
            codeSmellID: id,
            lineNumber: num, 
        }
    }
}
