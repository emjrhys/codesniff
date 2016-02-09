import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import code from './code'

const rootReducer = combineReducers({
    code,
    router: routerStateReducer,
});

export default rootReducer
