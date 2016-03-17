import { 
    RECEIVE_CODESMELLS,
    REQUEST_CODESMELLS
} from '../constants/ActionTypes';
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

// TODO Update depending on where we store the codesmells - DB or config
export function fetchCodeSmells() {
	return function (dispatch) {
		dispatch(requestCodeSmells());
		return request
			.get('http://localhost:8000/app/codesmells/')
			.end(function(err, res) {
				if(err || !res.ok) {
                    console.log("fetch codesmells failure...");                    
                }
                else {
                    console.log("fetch codesmells success!");                    
                    var data = JSON.parse(res.text);
                    dispatch(receiveCodeSmells(data));
                
                }
			});
	}
}

export function addCodeSmells(userid, codeid, codesmells) {
    return function (dispatch) {
        return request
            .post('http://localhost:8000/app/checksmells/', {
                user: userid,
                code: codeid,
                smells: JSON.stringify(codesmells)
            }) 
            .set('Accept', 'application/json')
            .end(function(err, res) {
                console.log(res);
                if(err || !res.ok) {
                    console.log("add codesmells failure...");
                } else {
                    console.log("add codesmells success!");
                }
            });
    }   
} 
