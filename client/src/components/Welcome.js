import React, { PropTypes, Component } from 'react'

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.context.history.pushState(null, '/submit');
    }
    render() {
        return (
            <div className="component-welcome">
                <h1>CodeSniff</h1>
                <h2>Crowdsource your refactoring</h2>
                <form>
	                <button type="button" className="cta" onClick={this.handleClick}>Log In</button>
	                <button type="button">Sign Up</button>
                </form>
            </div>
        )
    }
}

Welcome.contextTypes = { history: React.PropTypes.object.isRequired }

export default Welcome
