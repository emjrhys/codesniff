import React, { PropTypes, Component } from 'react'

class Welcome extends Component {

    render() {
        return (
            <div className="component-welcome">
                <h1>CodeSniff</h1>
                <h2>Crowdsource your refactoring</h2>
                <form>
	                <button type="button" className="cta">Log In</button>
	                <button type="button">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Welcome
