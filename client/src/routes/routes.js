import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Welcome from '../containers/Welcome';
import SubmitCode from '../containers/SubmitCode';
import ReviewCode from '../containers/ReviewCode';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Profile from '../containers/Profile';
import {requireAuthentication} from '../components/AuthenticatedComponent'

//TODO Add requireAuthentication to ReviewCode and SubmitCode
const routes = (
                <Route path="/" component={App}>
                    <IndexRoute component={Welcome} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={SignUp} />
                    <Route path="submit" component={SubmitCode} />
                    <Route path="code/:id" component={ReviewCode} />
                    <Route path="profile" component={Profile} />
                    <Route path="*" component={Welcome} />
                </Route>
                );

export { routes };
