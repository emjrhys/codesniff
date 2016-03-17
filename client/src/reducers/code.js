import { combineReducers } from 'redux';
import { 
    FETCH_CODE_ID,
    REQUEST_CODE, 
    RECEIVE_CODE, 
    SELECT_CODE, 
    SEND_CODE, 
    SEND_CODE_ID,
    SUBMIT_CODE 
} from '../constants/ActionTypes';
import _ from 'lodash';

export default function codes(state = {}, action) {
    switch (action.type) {
        case FETCH_CODE_ID:
            return state;

        case SEND_CODE:
            return Object.assign({}, state, {
                code: action.payload.code
            });

        case SEND_CODE_ID:
            return Object.assign({}, state, {
                codeid: action.payload.codeid
            });

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
            let selectedLines = state.selectedLines || [];
            let selectedLineObject = {};
            selectedLineObject["line"] = action.payload.lineNumber;
            selectedLineObject["smell"] = action.payload.codeSmellName;
            selectedLines.push(selectedLineObject);
            return Object.assign({}, state, {
                selectedLines: _.uniqWith(selectedLines, _.isEqual)
            });

        case SUBMIT_CODE:
            return state;

        default:
            return state;
    }
}
