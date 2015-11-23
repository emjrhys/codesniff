import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CodeSniff extends Component {

    render() {
        return (
            <div>
                <h1>CodeSniff</h1>
            </div>
        )
    }
}

ReactDOM.render(
        <CodeSniff />,
        document.getElementById('container')
);
