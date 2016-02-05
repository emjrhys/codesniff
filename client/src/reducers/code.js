import { combineReducers } from 'redux';
import { SEND_CODE, REQUEST_CODE, RECEIVE_CODE } from '../constants/ActionTypes';


export default function codes(state = {}, action) {
    switch (action.type) {
        case SEND_CODE:
            return [
                {
                    id: state.reduce((madId, code) => Math.max(code.id, maxId), -1) + 1,
                    code: action.text
                },
                ...state
            ]
        case REQUEST_CODE:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_CODE:
            return Object.assign({}, state, {
                isFetching: false,
                codeReview: action.code
            });
        default:
            return {}
    }
}
