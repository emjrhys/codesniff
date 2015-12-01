import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const store = compose(
            reduxReactRouter({ createHistory })
            )(createStore)(rootReducer, initialState);

    if (module.hot) {

        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
