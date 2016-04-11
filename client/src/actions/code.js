import { 
    TRANSFER_CODE, 
    REQUEST_CODE, 
    RECEIVE_CODE, 
    REQUEST_CODE_BY_USERID,
    RECEIVE_CODE_BY_USERID,
    SELECT_CODE, 
    SUBMIT_CODE,
    SUBMIT_CODE_SUCCESS,
    CLEAR_CODE,
} from '../constants/ActionTypes';
import request from 'superagent';

export function clearCode() {
    return {
        type: CLEAR_CODE,
    }
}

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

function requestCodeByUserId(userid) {
    return {
        type: REQUEST_CODE_BY_USERID,
        payload: {
            isFetchingByUserId: true,
            userId: userid
        }
    }
}
    

function receiveCodesByUserId(json) {
    return {
        type: RECEIVE_CODE_BY_USERID,
        payload: {
            isFetchingByUserId: false,
            hasNewLoad: false,
            codelist: json 
        }
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

export function transferCode(code) { 
    return {
        type: TRANSFER_CODE,
        payload: {
            code: code
        }
    }  
}

export function submitCodeSuccess(id) {
    return {
        type: SUBMIT_CODE_SUCCESS,
        payload: {
            hasSubmitted: true,
            codeid: id
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
                } else {
                    console.log("fetch code success!");                    
                    var data = JSON.parse(res.text);
                    dispatch(receiveCode(data));
                }
            
            });
    }
}

export function fetchCodesByUserId(userid) {
    return function (dispatch) {

        dispatch(requestCodeByUserId(userid));

        return request
            .get('http://localhost:8000/app/codes')
            .query({ creator: userid })
            .end(function(err, res) {
                if (err || !res.ok) {
                    console.log("fetch codes by user failure...");
                } else {
                    console.log("fetch codes by user success!");
                    var data = JSON.parse(res.text);
                    dispatch(receiveCodesByUserId(data));
                }
            })
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
            .end(function(err, res) {
                if(err || !res.ok) {
                    console.log("submit code failure...");
                } else {
                    console.log("submit code success!");
                    var data = JSON.parse(res.text);
                    dispatch(submitCodeSuccess(data.id));
                }
            });
    }   
} 
