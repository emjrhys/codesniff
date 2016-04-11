import { 
	CLEAR_CODESMELLS,
	RECEIVE_CODESMELLS, 
	REQUEST_CODESMELLS,
	RECEIVE_SCORE
} from '../constants/ActionTypes';

const initialState = {
	score: -1,
	missed: [],
	correct: [],
	incorrect: []
}

export default function codesmells(state = initialState, action) {
	switch (action.type) {
		case CLEAR_CODESMELLS:
			return initialState;
		case RECEIVE_CODESMELLS:
			return state;
		case REQUEST_CODESMELLS:
			return Object.assign({}, state, {
				codeSmells: action.payload.smells
			});
		case RECEIVE_SCORE:
			return Object.assign({}, state, {
				score: action.payload.score,
				missedLines: action.payload.missedLines || [],
				correctLines: action.payload.correctLines || [],
				incorrectLines: action.payload.incorrectLines || []
 			});
		default:
			return state;
	}
}