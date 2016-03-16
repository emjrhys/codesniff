import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Welcome from '../containers/Welcome';
import SubmitCode from '../containers/SubmitCode';
import ReviewCode from '../containers/ReviewCode';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Profile from '../containers/Profile';
import {requireAuthentication} from '../components/AuthenticatedComponent';
import Info from '../containers/Info';
import AllCode from '../containers/AllCode';

//TODO Add requireAuthentication to ReviewCode and SubmitCode
const routes = (
                <Route path="/" component={App}>
                    <IndexRoute component={Welcome} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={SignUp} />
                    <Route path="submit" component={SubmitCode} />
<<<<<<< HEAD
                    <Route path="code/:id" component={requireAuthentication(ReviewCode)} />
                    <Route path="profile" component={requireAuthentication(Profile)} />
                    <Route path="info" component={Info} />
                    <Route path="allCode" component={AllCode} />
=======
                    <Route path="code/:id" component={ReviewCode} />
                    <Route path="profile" component={Profile} />
>>>>>>> b7b3197c10c123523e4d3d308588639605b5331f
                    <Route path="*" component={Welcome} />
                </Route>
                );

export { routes };
