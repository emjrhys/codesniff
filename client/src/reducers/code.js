import { combineReducers } from 'redux';
import { 
    TRANSFER_CODE, 
    REQUEST_CODE, 
    RECEIVE_CODE, 
    RECEIVE_ALL_CODE,
    REQUEST_CODE_BY_USERID,
    RECEIVE_CODE_BY_USERID,
    FETCH_ALL_CODE,
    SELECT_CODE, 
    SUBMIT_CODE,
    SUBMIT_CODE_SUCCESS,
    CLEAR_CODE,
} from '../constants/ActionTypes';
import _ from 'lodash';

/**
 * Initially, the code state has a new load waiting to be called, it has not submitted
 * and its selected lines is an empty array.
 */
const initialState = {
    hasNewLoad: true,
    hasSubmitted: false,
    selectedLines: []
}

/**
 * The code reducer handles 9 different actions:
 * 1. Transfer code is called by the submit code component to pass just the code snippet to
 *    the submit code smells component.
 * 2. Clear code clears every change we've made and returns the initialState.
 * 3. Request code is called at the beginning of fetchCode and it sets isFetching to true.
 * 4. Receive code is called at the end of successful fetchCode and assigns the content to
 *    codeReview as well as clears any selectedLines that may have been set.
 * 5. Request code by user ID is called at the beginning of fetchCodesByUserId.
 * 6. Receive code by user ID is called at the end of successful fetchCodesByUserId and it 
 *    populates the codelist content.
 * 7. Receive all code populates the codes content.
 * 8. Select code assigns a code smell to a line and adds it to the selectedLines array; we 
 *    user lodash to make sure that selectedLines is a unique array.
 * 9. Submit code success is called at the end of successful submit code and it passes back a 
 *    code ID that was assigned to the code snippet.
 *
 * TODO: There's a lot of duplication on these reducer functions, can definitely simplify.
 */
export default function codes(state = initialState, action) {
    switch (action.type) {
        case TRANSFER_CODE:
            return Object.assign({}, state, {
                selectedLines: [],
                hasSubmitted: false,
                code: action.payload.code
            });

        case CLEAR_CODE:
            return initialState;

        case REQUEST_CODE:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_CODE:
            return Object.assign({}, state, {
                isFetching: false,
                codeReview: action.code,
                selectedLines: []
            });

        case REQUEST_CODE_BY_USERID:
            return Object.assign({}, state, {
                isFetchingByUserId: true
            });

        case RECEIVE_CODE_BY_USERID:
            return Object.assign({}, state, {
                hasNewLoad: false,
                isFetchingByUserId: false,
                codelist: action.payload.codelist
            });

        case RECEIVE_ALL_CODE:
            return Object.assign({}, state, {
                isFetching: false,
                codes: action.payload.code,
            });

        case SELECT_CODE:
            let selectedLines = state.selectedLines;
            let selectedLineObject = {};
            selectedLineObject["line"] = action.payload.lineNumber;
            selectedLineObject["smell"] = action.payload.codeSmellName;
            selectedLines.push(selectedLineObject);
            return Object.assign({}, state, {
                selectedLines: _.uniqWith(selectedLines, _.isEqual)
            });

        case SUBMIT_CODE_SUCCESS:
            return Object.assign({}, state, {
                hasNewLoad: true,
                hasSubmitted: true,
                codeid: action.payload.codeid
            });

        default:
            return state;
    }
}
