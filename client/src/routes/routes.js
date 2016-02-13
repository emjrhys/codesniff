import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Welcome from '../containers/Welcome';
import SubmitCode from '../containers/SubmitCode';
import ReviewCode from '../containers/ReviewCode';

const routes = (
                <Route path="/" component={App}>
                    <IndexRoute component={Welcome} />
                    <Route path="submit" component={SubmitCode} />
                    <Route path="code/:id" component={ReviewCode} />
                    <Route path="*" component={Welcome} />
                </Route>
                );

export { routes };
