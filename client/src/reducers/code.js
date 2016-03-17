import { combineReducers } from 'redux';
import { 
    REQUEST_CODE, 
    RECEIVE_CODE, 
    SELECT_CODE, 
    SEND_CODE, 
    SUBMIT_CODE,
    SUBMIT_CODE_SUCCESS  
} from '../constants/ActionTypes';
import _ from 'lodash';

export default function codes(state = {}, action) {
    switch (action.type) {
        case SEND_CODE:
            return Object.assign({}, state, {
                code: action.payload.code
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

        case SUBMIT_CODE_SUCCESS:
            return Object.assign({}, state, {
                codeid: action.payload.codeid
            });

        default:
            return state;
    }
}
