import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchCode } from '../actions/code.js';
import CodeBlock from '../components/CodeBlock';

/**
 * The check code smell component displays the score of the code snippet as well as the lines that
 * were correctly and incorrectly identified as well as missed lines. 
 *
 * TODO: Simplify logic for displaying line colors, right now it's a little hacky.
 * Create syntax highlighting for different languages. 
 */
class CheckCodeSmells extends Component {
	constructor(props) {
		super(props);
		this.extractLineNumbers = this.extractLineNumbers.bind(this);
	}

	componentDidMount() {
		const { dispatch, id } = this.props;
		dispatch(fetchCode(id));
	}

	extractLineNumbers(selectedLines, arr, color) {
		for (var i = 0; i < arr.length; i++) {
			selectedLines[arr[i].line - 1] = color;
		}
	}

	render() {
		const { code, score, missedLines, correctLines, incorrectLines } = this.props;
		var codeDisplay, scoreDisplay;
		var contentByLines = code.content.split("\n");
		var selectedLines = Array(contentByLines.length - 1).join(".").split(".");

		if (correctLines && correctLines.length > 0) {
			this.extractLineNumbers(selectedLines, correctLines, "green");
		}

		if (missedLines && missedLines.length > 0) {
			this.extractLineNumbers(selectedLines, missedLines, "purple");
		}

		// should override missedLines if a line is incorrect - which is fine
		if (incorrectLines && incorrectLines.length > 0) {
			this.extractLineNumbers(selectedLines, incorrectLines, "red");
		}

		if (code) {
			for (var i = 0; i < contentByLines.length; i++) {
				var num = eval(i + 1);
				contentByLines[i] = {
					color: selectedLines[i],
					lineNumber: num,
					line: contentByLines[i],
				};
			} 

			codeDisplay = (
				<CodeBlock
					clickAction={() => null}
					codeLines={contentByLines}/>  
				);  
		}

		if (score > -1) {
			scoreDisplay = (
				<h4>Your score is {score}</h4>
				);
		} else {
			scoreDisplay = (
				<h4>You reached this page from an illegal source! Stop!</h4>
				)
		}

		return(
			<div className="component-review">
			<h2>Check CodeSmells</h2>
				<div>
					{scoreDisplay}
				</div>
				<p>	Code smells you got correct are displayed in <span className="green">green</span>.<br/> 
					Code smells you got incorrect are displayed in <span className="red">red</span>.<br/>
					Code smells you missed are displayed in <span className="purple">purple</span>. 
				</p>
                <div className="codearea">
                    {codeDisplay}
                </div> 
			</div>
			);
	}
}

CheckCodeSmells.PropTypes = {
	id: PropTypes.string,
	code: PropTypes.object,
	score: PropTypes.number,
	missedLines: PropTypes.array,
	correctLines: PropTypes.array,
	incorrectLines: PropTypes.array,
}

function mapStateToProps(state) {
	var id = state.router.params.id;
	var code = state.code.codeReview;
	var score = state.smells.score;
	var missedLines = state.smells.missedLines;
	var correctLines = state.smells.correctLines;
	var incorrectLines = state.smells.incorrectLines;

	return {
		id,
		code,
		score,
		missedLines,
		correctLines,
		incorrectLines
	}
}

export default connect(mapStateToProps)(CheckCodeSmells);