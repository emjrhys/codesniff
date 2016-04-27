import { 
    CLEAR_CODESMELLS,
    RECEIVE_CODESMELLS,
    REQUEST_CODESMELLS,
    RECEIVE_SCORE

} from '../constants/ActionTypes';
import request from 'superagent';

/**
 * Requests code smells.
 */
function requestCodeSmells() {
    return {
        type: REQUEST_CODESMELLS,
    }
}

/**
 * Receive the code smells and assigns it to smells.
 * @param json: smells
 */
function receiveCodeSmells(json) {
    return {
        type: RECEIVE_CODESMELLS,
        payload: {
        	smells: json
        }
    }
}

/**
 * Receive the score as well as the correct, incorrect and missed lines.
 * @param score
 * @param missed
 * @param correct
 * @param incorrect
 */
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

/**
 * Clears all the code smells.
 */
export function clearCodeSmells() {
    return {
        type: CLEAR_CODESMELLS
    }
}

/**
 * Fetches the code smells, currently not being used.
 *
 * TODO: Use it, we're currently hardcoding the code smells in because that was implemented 
 *      before this endpoint was created.
 */
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

/**
 * Add code smells takes a user's attempt to code and returns a score as well as information about what
 * they got correct, incorrect and missed.
 * @param userid
 * @param codeid
 * @param codesmells
 *
 * TODO: Relate the userid with the code smells submission so we can later pull submissions by user.
 * If the creator of the code snippet submits, their attempt is marked as the correct response for all
 *      future attempts. Is that a good idea?
 */
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
