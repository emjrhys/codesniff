import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Welcome from '../components/Welcome'


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

                <div>
                    {this.props.children}
                </div>
               );
    }
}

export default connect()(App)
