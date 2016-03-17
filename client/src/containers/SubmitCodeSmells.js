import React, { PropTypes, Component } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { fetchCodeId, selectCode, submitCode } from '../actions/code.js';
import CodeBlock from '../components/CodeBlock';

class SubmitCodeSmells extends Component {
	constructor(props) {
		super(props);
		this.clickAction = this.clickAction.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectCodeSmell = this.selectCodeSmell.bind(this);
		this.state = {
			codeSmellName: ""
		};
	}

    componentDidMount() {

    }

	clickAction(lineNumber) {
        const { dispatch } = this.props;
        if (this.state.codeSmellName !== "") {
            dispatch(selectCode(lineNumber, this.state.codeSmellName));
        }
    }

	handleSubmit() {
		const { dispatch, code, codeid, userid, selectedLines } = this.props;
        if (selectedLines.length !== 0) {
            dispatch(submitCode(userid, code, selectedLines));
            dispatch(fetchCodeId());
            console.log("CODE ID" + codeid);
        } else {
            console.log("You didn't input any code smells!");
        }
	}

    selectCodeSmell(name) {
        this.setState({
            codeSmellName: name
        });
    }

	render() {
		const { code, codeSmells, selectedLines } = this.props;
		var contentByLines = code.content.split("\n");
		for (var i in contentByLines) {
            contentByLines[i] = {
                lineNumber: i + 1,
                line: contentByLines[i],
            };
        }   
        
		return(
			<div className="component-review">
                <h2>Submit CodeSmells</h2>
                <div>
                    {
                        codeSmells.map((codeSmell) => {
                            return(<button 
                                    className="codesmell"
                                    key={codeSmell.id}
                                    onClick={() => this.selectCodeSmell(codeSmell.name)}>
                                    {codeSmell.name}
                                </button>)
                        })
                    }
                </div>
                <div className="codearea">
                    <CodeBlock
                        codeLines={contentByLines}
                        clickAction={this.clickAction}
                        selectedLines={selectedLines}
                    />  
                </div> 
                <button
                    onClick={this.handleSubmit}
                    type="button"
                    className="cta">
                    Submit
                </button>
            </div>
		)
	}
}

SubmitCodeSmells.propTypes = {
	code: PropTypes.object,
    codeid: PropTypes.number,
	userid: PropTypes.number,
	codeSmells: PropTypes.array,
	selectedLines: PropTypes.array
}

function mapStateToProps(state) {
    var code = state.code.code;
    var codeid = state.code.codeid;
	var userid = state.user.userid;
	var codeSmells = state.smells.codeSmells || [
        {id: 1, name: "duplicate code"},
        {id: 2, name: "long methods/functions"},
        {id: 3, name: "large classes"},
        {id: 4, name: "long parameter list"},
        {id: 5, name: "message chain"},
        {id: 6, name: "feature envy"},
        {id: 7, name: "switch statements"},
        {id: 8, name: "temporary fields"},
        {id: 9, name: "refused bequest"},
        {id: 10, name: "too many bugs"},
        {id: 11, name: "too hard to understand"},
        {id: 12, name: "too hard to change"}];
    var selectedLines = state.code.selectedLines || [];

    return {
    	code,
        codeid,
    	userid,
    	codeSmells,
    	selectedLines
    }
}

export default connect(mapStateToProps)(SubmitCodeSmells);