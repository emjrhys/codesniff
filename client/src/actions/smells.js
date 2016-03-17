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

export function fetchCodeSmells() {
	return function (dispatch) {
		dispatch(requestCodeSmells());
		return request
			.get('http://localhost:8000/app/codesmells/')
			.end(function(err, res) {
				if(err || !res.ok) {
                    console.log("fetch codesmells failure...");                    
                } else {
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
            .end(function(err, res) {
                console.log(res);
                if(err || !res.ok) {
                    console.log("add codesmells failure...");
                } else {
                    console.log('add codesmells success!');
                }
            });
    }   
} 

export function addCodeSmells(user, codeid, line, codesmellname) {
    return function (dispatch) {
        return request
            .post('http://localhost:8000/app/codesmells/', {
                user: user,
                codeid: codeid,
                line: line,
                codesmellid: codesmellname
            }) 
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
