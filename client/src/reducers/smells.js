import { 
	CLEAR_CODESMELLS,
	RECEIVE_CODESMELLS, 
	REQUEST_CODESMELLS,
	RECEIVE_SCORE
} from '../constants/ActionTypes';

/**
 * Initial state for a smells state, which has a negative score and empty arrays for the correct,
 * incorrect, and missed lines.
 */
const initialState = {
	score: -1,
	missed: [],
	correct: [],
	incorrect: []
}

/**
 * The smells reducer handles 4 different actions:
 * 1. Clear code smells clears every change we've made and returns the initialState.
 * 2. Receive code smells returns all the code smells we have in the backend, currently not being used.
 * 3. Request code smells is called the beginning of fetchCodeSmells and it marks our intent to request.
 *    NOTE: not sure why it's assigned codeSmells
 * 4. Receive score is called at the end of a successful code smells and assigns the score, correct,
 *    incorrect and missed lines that's to be displayed by the check code smells component.
 */
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