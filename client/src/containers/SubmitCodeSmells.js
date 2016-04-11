import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchCodeId, selectCode, submitCode } from '../actions/code.js';
import { getUserInfo } from '../actions/user.js';
import CodeBlock from '../components/CodeBlock';
import ShareLinkModal from '../components/ShareLinkModal';

class SubmitCodeSmells extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectCodeSmell = this.selectCodeSmell.bind(this);
        this.redirectToReviewCode = this.redirectToReviewCode.bind(this);
        this.state = {
            codeSmellName: "",
            isModalOpen: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

    componentWillReceiveProps(nextProps) {
        const { hasSubmitted } = nextProps;
        if (hasSubmitted) {
            this.setState({
                isModalOpen: true
            });
        }
    }

    clickAction(lineNumber) {
        const { dispatch } = this.props;
        if (this.state.codeSmellName !== "") {
            dispatch(selectCode(lineNumber, this.state.codeSmellName));
        }
    }

    redirectToReviewCode(codeid) {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/code/${codeid}`));
    }

    handleSubmit() {
        const { dispatch, code, userid, selectedLines, hasSubmitted } = this.props;
        if (!hasSubmitted) {
            if (selectedLines.length !== 0) {
                dispatch(submitCode(userid, code, selectedLines));
            } else {
				console.log("You didn't input any code smells!");
			}
		} else { 
			this.setState({
				isModalOpen: true
			});
		}
	}

    selectCodeSmell(name) {
        this.setState({
            codeSmellName: name
        });
    }

	closeModal() {
		this.setState({
			isModalOpen: false
		});
	}

	render() {
		const { code, codeid, codeSmells, selectedLines } = this.props;
        var shareLinkDisplay;
        var content = "";

        if (code) {
            content = code.content.split("\n");
    		for (var i = 0; i < content.length; i++) {
    			var num = eval(i + 1);
    			content[i] = {
    				lineNumber: num,
    				line: content[i],
    			};
    		}   
        }
        
		if (codeid) {
			shareLinkDisplay = (
				<ShareLinkModal
					codeid={codeid}
                    className="modal"
                    transitionName="modal-anim"
                    closeModal={this.closeModal}
                    isOpen={this.state.isModalOpen}
                    clickAction={this.redirectToReviewCode}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}/>
                );
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
                        codeLines={content}
                        colorClass="highlight"
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
				<div>
					{shareLinkDisplay}
				</div>
            </div>
		)
	}
}

SubmitCodeSmells.propTypes = {
    code: PropTypes.object,
    codeid: PropTypes.number,
    userid: PropTypes.number,
    codeSmells: PropTypes.array,
    hasSubmitted: PropTypes.bool,
    selectedLines: PropTypes.array
}

function mapStateToProps(state) {
    var code = state.code.code;
    var codeid = state.code.codeid;
    var userid = state.user.user.id;
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
    var hasSubmitted = state.code.hasSubmitted;
    var selectedLines = state.code.selectedLines || [];

    return {
        code,
        codeid,
        userid,
        codeSmells,
        hasSubmitted,
        selectedLines
    }
}

export default connect(mapStateToProps)(SubmitCodeSmells);