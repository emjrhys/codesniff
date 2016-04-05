import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { logoutAndRedirect } from '../actions/auth'
import { clearCode } from '../actions/code'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'


class App extends Component {
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.redirectToAbout = this.redirectToAbout.bind(this);
        this.redirectToBrowse = this.redirectToBrowse.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch(logoutAndRedirect());
        this.props.dispatch(clearCode());
    }

    handleRedirect() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/`));
    }

    redirectToAbout() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/info`));
    }

    redirectToBrowse() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/allCode`));
    }

    redirectToProfile() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/profile`));
    }

    render() {
        return (
                <div>
                    <div className="header">
                        <div className="nav">
                            <h2 onClick={this.handleRedirect}>CodeSniff</h2>
                        </div>
                        <div className="nav right">
                            <h2 onClick={this.redirectToAbout}>About</h2>
                            <h2 onClick={this.redirectToBrowse}>Browse</h2>
                            <h2 onClick={this.redirectToProfile}>Profile</h2>
                            { (localStorage.getItem('token') !== null) ?
                                <h2 onClick={this.logout}>Logout</h2> : "" }
                        </div>
                    </div>
                    {this.props.children}
                </div>
               );
    }
}

export default connect()(App)
