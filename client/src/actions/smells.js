import { 
    CLEAR_CODESMELLS,
    RECEIVE_CODESMELLS,
    REQUEST_CODESMELLS,
    RECEIVE_SCORE

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

function receiveCodeSmellsScore(score, missed, correct, incorrect) {
    return {
        type: RECEIVE_SCORE,
        payload: {
            score: score,
            missedLines: missed,
            correctLines: correct,
            incorrectLines: incorrect
        }
    }
}

export function clearCodeSmells() {
    return {
        type: CLEAR_CODESMELLS
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
                if(err || !res.ok) {
                    console.log("add codesmells failure...");
                } else {
                    // data.correct[0].smell
                    console.log("add codesmells success!");
                    var data = JSON.parse(res.text);
                    var score = JSON.parse(data.score);
                    var missed = data.missed;
                    var correct = data.correct;
                    var incorrect = data.incorrect;
                    dispatch(receiveCodeSmellsScore(score, missed, correct, incorrect));
                }
            });
    }   
} 
