import { REQUEST_CODESMELLS, RECEIVE_CODESMELLS } from '../constants/ActionTypes';
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
			.get('http://localhost:8000/app/codesmells')
			.end(function(err, res) {
				if(res && res.status === '404') {
                    reject();
                }
                else {
                    
                    var data = JSON.parse(res.text);
                    dispatch(receiveCodeSmells(data));
                
                }
			});
	}
}