import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Route, Router, IndexRoute } from 'react-router';
import App from './containers/App';
import SubmitCode from './containers/SubmitCode';
import Welcome from './containers/Welcome.js';
import configureStore from './store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { routes } from './routes/routes';

const store = configureStore();

render(
        <Provider store={store}>
            <ReduxRouter>{ routes }</ReduxRouter>
        </Provider>,
        document.getElementById('container')
      );
