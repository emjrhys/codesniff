import React from 'react';
import { render } from 'react-dom';
import { Route } from 'history';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();


render(
        <Provider store={store}>
            <ReduxRouter>
                <Route path="/" component={App}>
                    <Route path="submit" component={SubmitCode} />
                </Route>
            </ReduxRouter>
        </Provider>,
        document.getElementById('container')
      );
