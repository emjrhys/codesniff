import React, { PropTypes, Component } from 'react'

/**
 * The welcome component displays the log in and sign up buttons, which will redirect the user.
 */
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.routeToLogIn = this.routeToLogIn.bind(this);
        this.routeToSignUp = this.routeToSignUp.bind(this);
    }
    routeToLogIn() {
        this.context.history.pushState(null, '/profile');
    }
    routeToSignUp() {
        this.context.history.pushState(null, '/signup');
    }
    render() {
        return (
            <div className="component-welcome">
                <h1>CodeSniff</h1>
                <h2>Crowdsource your refactoring</h2>
                <form>
	                <button type="button" className="cta" onClick={this.routeToLogIn}>Log In</button>
	                <button type="button" onClick={this.routeToSignUp}>Sign Up</button>
                </form>
            </div>
        )
    }
}

Welcome.contextTypes = { history: React.PropTypes.object.isRequired }

export default Welcome
