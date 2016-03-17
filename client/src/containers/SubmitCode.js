import React, { PropTypes, Component } from 'react';
import { getUserInfo } from '../actions/user.js';
import { connect } from 'react-redux';

class SubmitCode extends Component {
	constructor(props) {
		super(props);
		// React components in ES6 no long autobinds this to nonReact methods
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.routeToSubmitCodeSmells = this.routeToSubmitCodeSmells.bind(this);
		this.state = {
			content: ""
		}
	}

	componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

	handleTitleChange(evt) {
		const { code } = this.props;
		code.title = evt.target.value;
	}

	handleLanguageSelect(evt) {
		const { code } = this.props;
		code.language = evt.target.value;
	}

	handleContentChange(evt) {
		const { code } = this.props;
		// console.log("CHANGING CONTENT " + evt.target.value);
		code.content = evt.target.value;
	}

    routeToSubmitCodeSmells() {
    	const { dispatch, user, code } = this.props;
        if (code.title === "") {
        	console.log("You need to input title!");
        } else if (code.language === "") {
        	console.log("You need to input language!");
        } else if (code.content === "") {
        	console.log("You need to input content!");
        } else {
        	localStorage.setItem("userid", user.id);
        	localStorage.setItem("code", JSON.stringify(code));
        	this.context.history.pushState(null, '/submitSmells');
        }
    }

	render() {
		var languages = [
			{value: "Java"},
			{value: "Python"},
			{value: "C"},
			{value: "C++"}
		];

		const { user, code } = this.props;

		return (
			<div className="component-submit">
				<h2>Submit Code</h2>
				<p>Logged in as <span className="profile">{ user.username }</span></p>
                <form>
					<label className="title">Title<input placeholder={this.state.value} onChange={this.handleTitleChange}/></label>
					<label><span>Language</span>
						<select onChange={this.handleLanguageSelect} required>
							<option value="">Select a Language</option>
							{
								languages.map((language) => {
									return (<option 
												value={language.value}>
													{language.value}
											</option>)
								})
							}
						</select>
					</label>
	                <textarea onChange={this.handleContentChange}>
	                	{this.state.content}
	                </textarea>
					<button
                        onClick={this.routeToSubmitCodeSmells}
                        type="button"
                        className="cta">
                        Add Codesmells
                    </button>
                </form>
			</div>
		)
	}
}

SubmitCode.contextTypes = { history: React.PropTypes.object.isRequred }

SubmitCode.propTypes = {
    user: PropTypes.object,
    code: PropTypes.object
}

function mapStateToProps(state) {
    var user = state.user.user; 
    var code = {
    	title : "",
    	content : "",
    	language : ""
    };

    return {
        user,
        code
    }
}

export default connect(mapStateToProps)(SubmitCode);
