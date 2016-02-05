import { createStore, applyMiddleware, compose } from 'redux'
import thunkMidddleware from 'redux-thunk';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import { routes } from '../routes/routes';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const store = compose(
            reduxReactRouter({ 
                routes,
                createHistory
            }),
            applyMiddleware(
                thunkMidddleware
            )
            )(createStore)(rootReducer, initialState);

    if (module.hot) {

        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
