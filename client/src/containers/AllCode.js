import React, { PropTypes, Component } from 'react'
import request from 'superagent';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

class AllCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codes: [],
        }
        this.routeToCode = this.routeToCode.bind(this);
    }

    routeToCode(code) {
        const { dispatch } = this.props;
        dispatch(pushState(null, '/code/' + code.id));
    }

    componentDidMount() {
        var header = 'Token ' + localStorage.getItem('token');
        
        request
            .get('http://localhost:8000/app/codes/')
            .end(function(err, res){
                this.setState({codes: res.body});
            }.bind(this));
    }

    render() {
        var codesnippets = this.state.codes.map(function(code) {
            return (
            <div className="codeblock" onClick={this.routeToCode.bind(this,code)}>
                <h2>{code.title}</h2>
                <div className="code">{code.content}</div>
            </div>
            );
        }, this);

        return (
            <div className="component-allcode">
                <h1>Code</h1>
                <div className="center">
                    {codesnippets}
                </div>
            </div>
        )
    };
}

export default connect()(AllCode)
