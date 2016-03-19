import { combineReducers } from 'redux';
import { 
    TRANSFER_CODE, 
    REQUEST_CODE, 
    RECEIVE_CODE, 
    RECEIVE_CODE_BY_USERID,
    SELECT_CODE, 
    SUBMIT_CODE,
    SUBMIT_CODE_SUCCESS  
} from '../constants/ActionTypes';
import _ from 'lodash';

export default function codes(state = {}, action) {
    switch (action.type) {
        case TRANSFER_CODE:
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

        case RECEIVE_CODE_BY_USERID:
            return Object.assign({}, state, {
                codelist: action.payload.codelist
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
