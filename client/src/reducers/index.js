import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import code from './code'
import auth from './auth'
import user from './user'
import smells from './smells'

const rootReducer = combineReducers({
    code,
    auth,
    user,
    smells,
    router: routerStateReducer,
});

export default rootReducer
