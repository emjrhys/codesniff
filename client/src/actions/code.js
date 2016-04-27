import { 
    TRANSFER_CODE, 
    REQUEST_CODE, 
    RECEIVE_CODE, 
    REQUEST_CODE_BY_USERID,
    RECEIVE_CODE_BY_USERID,
    RECEIVE_ALL_CODE,
    SELECT_CODE, 
    SUBMIT_CODE,
    SUBMIT_CODE_SUCCESS,
    CLEAR_CODE,
} from '../constants/ActionTypes';
import request from 'superagent';

/**
 * Clears all the code.
 */
export function clearCode() {
    return {
        type: CLEAR_CODE,
    }
}

/**
 * Fetches all the code.
 *
 * TODO: Handle failure case.
 */
export function fetchAllCode() {
    return function (dispatch) {
        dispatch(requestAllCode());

        return request
            .get('http://localhost:8000/app/codes/')
            .end(function(err, res) {
                dispatch(receiveAllCode(res.body));
            });
    }
}

/**
 * Receives all the code and passes it back to RECEIVE_ALL_CODE reducer.
 */
export function receiveAllCode(codes) {
    return {
        type: RECEIVE_ALL_CODE,
        payload: {
            code: codes,
        }
    }
}

/**
 * Request all the codes, similar to requestCode.
 */
export function requestAllCode() {
    return {
        type: REQUEST_CODE,
    }
}

/**
 * Request a code by id.
 * @param id
 */
function requestCode(id) {
    return {
        type: REQUEST_CODE,
        isFetching: true,
        codeId: id
    }
}

/**
 * Receives the code passed in as json and sets isFetching to be false.
 * @param json: code snipept
 */
function receiveCode(json) {
    return {
        type: RECEIVE_CODE,
        isFetching: false,
        code: json
    }
}

/**
 * Requests all the code that has been submitted by the user with userid.
 * @param userid
 */
function requestCodeByUserId(userid) {
    return {
        type: REQUEST_CODE_BY_USERID,
        payload: {
            isFetchingByUserId: true,
            userId: userid
        }
    }
}
    
/**
 * Receive all the codes by userid and assigns it to codelist.
 * @param codes: all the code snippets
 */
function receiveCodesByUserId(codes) {
    return {
        type: RECEIVE_CODE_BY_USERID,
        payload: {
            isFetchingByUserId: false,
            hasNewLoad: false,
            codelist: codes 
        }
    }
}

/**
 * Select code assigns a line number and a code smell name and passes it back to the code reducer
 * to add to the selectedLines array.
 * @param num: line number
 * @param codesmell: name of code smell
 */
export function selectCode(num, codesmell) {
    return {
        type: SELECT_CODE, 
        payload: {
            lineNumber: num, 
            codeSmellName: codesmell
        }
    }
}

/**
 * Trasnfer code passes the code object to another action.
 * @param code: code snippet
 */ 
export function transferCode(code) { 
    return {
        type: TRANSFER_CODE,
        payload: {
            code: code
        }
    }  
}

/**
 * Submit code success assigns a newly created id to codeid and marks hasSubmitted to true.
 * @param id: codeid
 */
export function submitCodeSuccess(id) {
    return {
        type: SUBMIT_CODE_SUCCESS,
        payload: {
            hasSubmitted: true,
            codeid: id
        }
    }
}

/**
 * Fetch code requests a code snippet by id.
 * @param id: codeid
 */
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

/**
 * Fetches all codes that's been submitted by a user.
 * @param userid
 */
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

/**
 * Submit code submits a user's submission of a code snippet along with its codesmells.
 * @param userid
 * @param code
 * @param codesmells: selectedLines
 */
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
