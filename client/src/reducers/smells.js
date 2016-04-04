import { 
	RECEIVE_CODESMELLS, 
	REQUEST_CODESMELLS,
	RECEIVE_SCORE
} from '../constants/ActionTypes';

export default function codesmells(state = {}, action) {
	switch (action.type) {
		case RECEIVE_CODESMELLS:
			return state;
		case REQUEST_CODESMELLS:
			return Object.assign({}, state, {
				codeSmells: action.payload.smells
			});
		case RECEIVE_SCORE:
			return Object.assign({}, state, {
				score: action.payload.score
			});
		default:
			return state;
	}
}