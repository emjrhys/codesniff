import React from 'react';
import { checkSession } from '../actions/auth';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';


export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {
    
        componentDidMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            if(nextProps.isAuthenticated !== this.props.isAuthenticated) {
                this.checkAuth();
            }
        }

        checkAuth() {
            if (localStorage.getItem('token') !== null) {
                this.props.dispatch(checkSession());
                return;
            }

            if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                    <div>
                       {this.props.isAuthenticated === true ?
                            <Component 
                                {...this.props}/>
                            : null
                        } 
                    </div>
                   );
        }
    
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
