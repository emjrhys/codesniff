import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'


class App extends Component {
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/`));
    }

    render() {
        return (
                <div>
                    <div className="header">
                        <h2 onClick={this.handleRedirect}>CodeSniff</h2>
                    </div>
                    {this.props.children}
                </div>
               );
    }
}

export default connect()(App)
