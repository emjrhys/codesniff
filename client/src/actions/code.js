import { 
    FETCH_CODE_ID,
    REQUEST_CODE, 
    RECEIVE_CODE, 
    SELECT_CODE, 
    SEND_CODE, 
    SEND_CODE_ID,
    SUBMIT_CODE 
} from '../constants/ActionTypes';
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

export function selectCode(num, codesmell) {
    return {
        type: SELECT_CODE, 
        payload: {
            lineNumber: num, 
            codeSmellName: codesmell
        }
    }
}

export function sendCode(code) { 
    return {
        type: SEND_CODE,
        payload: {
            code: code
        }
    }  
}

export function fetchCodeId() {
    return {
        type: FETCH_CODE_ID
    }
}

export function sendCodeId(codeid) {
    return {
        type: SEND_CODE_ID,
        payload: {
            codeid: codeid
        }
    }
}

export function fetchCode(id) {
    return function (dispatch) {
     
        dispatch(requestCode(id));

        // If I add the token, it fails the OPTIONS request
        return request
            .get('http://localhost:8000/app/codes/' + id)
            .end(function(err, res) {
                if(err || !res.ok) {
                    console.log("fetch code failure...");                    
                }
                else {
                    console.log("fetch codesmells success!");                    
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
                if(err || !res.ok) {
                    console.log("submit code failure...");
                } else {
                    console.log("submit code success!");
                    var data = JSON.parse(res.text);
                    dispatch(sendCodeId(data.id));
                }
            });
    }   
} 