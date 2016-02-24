import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import code from './code'
import auth from './auth'

const rootReducer = combineReducers({
    code,
    auth,
    router: routerStateReducer,
});

export default rootReducer
