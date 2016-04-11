import React, { PropTypes, Component } from 'react'
import { fetchAllCode } from '../actions/code';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

class AllCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 0,
        }
        this.routeToCode = this.routeToCode.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
    }

    routeToCode(code) {
        const { dispatch } = this.props;
        dispatch(pushState(null, '/code/' + code.id));
    }

    componentDidMount() {
        this.props.dispatch(fetchAllCode());
    }

    componentWillReceiveProps(nextProps) {
        let { dispatch, codes } = nextProps;
    }

    changeDifficulty(diff) {
        this.setState({
            difficulty: diff,
        });
    }

    render() {
        
        let { codes } = this.props;

        var codesnippets = codes.map(function(code) {
            let codediff = Math.floor(code.difficulty / 33) + 1;
            if(codediff > 3) {
                codediff = 3;
            }
            if(this.state.difficulty === 0 || codediff === this.state.difficulty) {
                return (
                    <div className="codeblock" onClick={this.routeToCode.bind(this,code)}>
                        <h2>{code.title}</h2>
                        <div className="code">{code.content}</div>
                    </div>
                );
            }
        }, this);

        return (
            <div className="component-allcode">
                <h1>Code</h1>
                <div className="difficultydiv">
                    <button className="difficulty" onClick={() => this.changeDifficulty(0)}>All</button> 
                    <button className="difficulty" onClick={() => this.changeDifficulty(1)}> Easy</button>  
                    <button className="difficulty" onClick={() => this.changeDifficulty(2)}> Medium</button> 
                    <button className="difficulty" onClick={() => this.changeDifficulty(3)}> Hard</button>
                </div>
                <div className="center">
                    {codesnippets}
                </div>
            </div>
        )
    };
}

AllCode.propTypes = {
    codes: PropTypes.array,
};

function mapPropsToState(state) {
    let codes = state.code.codes || [];

    return {
        codes
    }
}

export default connect(mapPropsToState)(AllCode)
