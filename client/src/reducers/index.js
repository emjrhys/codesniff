import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import code from './code'
import auth from './auth'
import user from './user'

const rootReducer = combineReducers({
    code,
    auth,
    user,
    router: routerStateReducer,
});

export default rootReducer
