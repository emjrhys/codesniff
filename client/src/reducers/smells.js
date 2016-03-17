import { 
	RECEIVE_CODESMELLS, 
	REQUEST_CODESMELLS
} from '../constants/ActionTypes';

export default function codesmells(state = {}, action) {
	switch (action.type) {
		case RECEIVE_CODESMELLS:
			return state;
		case REQUEST_CODESMELLS:
			return Object.assign({}, state, {
				codeSmells: action.payload.smells
			});
		default:
			return state;
	}
}