import { combineReducers } from 'redux';
import { SEND_CODE, REQUEST_CODE, RECEIVE_CODE, SELECT_CODE } from '../constants/ActionTypes';
import _ from 'underscore';

export default function codes(state = {}, action) {
    switch (action.type) {
        case SEND_CODE:
            return state;

        case REQUEST_CODE:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_CODE:
            return Object.assign({}, state, {
                isFetching: false,
                codeReview: action.code
            });

        case SELECT_CODE:
            let selectedLines = state.selectedLines || {};
            selectedLines[action.payload.lineNumber] = action.payload.codeSmellId; 

            return Object.assign({}, state, {
                selectedLines
            });

        default:
            return state;
    }
}
