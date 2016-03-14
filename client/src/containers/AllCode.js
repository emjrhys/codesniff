import React, { PropTypes, Component } from 'react'
import request from 'superagent';

class AllCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codes: [],
        }
        this.routeToCode = this.routeToCode.bind(this);
    }

    routeToCode(code) {
        this.context.history.pushState(null, '/code/' + code.id);
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
AllCode.contextTypes = { history: React.PropTypes.object.isRequired }

export default AllCode
