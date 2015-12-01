import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Route, Router } from 'react-router';
import App from './containers/App';
import SubmitCode from './components/SubmitCode';
import configureStore from './store/configureStore';

const store = configureStore();

console.log(App);

render(
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}>
                    <Route path="/submit" component={SubmitCode} />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('container')
      );
