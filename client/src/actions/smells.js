import { REQUEST_CODESMELLS, RECEIVE_CODESMELLS, ADD_CODESMELLS, ADD_DEFAULT_CODESMELLS } from '../constants/ActionTypes';
import request from 'superagent';

function requestCodeSmells() {

    return {
        type: REQUEST_CODESMELLS,
    }

}

function receiveCodeSmells(json) {

    return {
        type: RECEIVE_CODESMELLS,
        payload: {
        	smells: json
        }
    }

}

function addCodeSmellsRequest() {
    return {
        type: ADD_CODESMELLS_REQUEST
    }
}

// TODO Update depending on where we store the codesmells - DB or config
export function fetchCodeSmells() {
	return function (dispatch) {
		dispatch(requestCodeSmells());
		return request
			.get('http://localhost:8000/app/codesmells/')
			.end(function(err, res) {
				if(res && res.status === 404) {
                    reject();
                }
                else {
                    
                    var data = JSON.parse(res.text);
                    dispatch(receiveCodeSmells(data));
                
                }
			});
	}
}

export function addCodeSmells(userid, codeid, codesmells, redirect="/") {
    return function (dispatch) {
        //dispatch(addCodeSmellsRequest());
        return request
            .post('http://localhost:8000/app/checksmells/', {
                user: userid,
                code: codeid,
                smells: JSON.stringify(codesmells)
            }) 
            .set('Accept', 'application/json')
            .end(function(err, res) {
                console.log(res);
                if(res && (res.status === 400 || res.status === 404 || res.status === 500)) {
                    console.log("add codesmells failure...");
                    //reject();
                } else {
                    console.log('add codesmells success!');
                }
            });
    }   
} 
