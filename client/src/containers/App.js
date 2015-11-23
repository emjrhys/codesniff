import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Welcome from '../components/Welcome'

class App extends Component {

    render() {
        return (
                <div>
                    <Welcome />
                </div>
               )
    }
}

export default connect()(App)
