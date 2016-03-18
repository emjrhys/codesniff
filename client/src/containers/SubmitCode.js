import React, { PropTypes, Component } from 'react';
import { transferCode } from '../actions/code.js';
import { getUserInfo } from '../actions/user.js';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';


class SubmitCode extends Component {
	constructor(props) {
		super(props);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.routeToSubmitCodeSmells = this.routeToSubmitCodeSmells.bind(this);
		this.state = {
			title: "",
			language: "",
			content: ""
		}
	}

	componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

	handleTitleChange(evt) {
		this.setState({
			title: evt.target.value
		});
	}

	handleLanguageSelect(evt) {
		this.setState({
			language: evt.target.value
        });
	}

	handleContentChange(evt) {
		this.setState({
			content: evt.target.value
		});
	}

	routeToSubmitCodeSmells() {
		const { dispatch, user } = this.props;
		if (this.state.title === "") {
			console.log("You need to input title!");
		} else if (this.state.language === "") {
			console.log("You need to input language!");
		} else if (this.state.content === "") {
			console.log("You need to input content!");
		} else {
			var code = {
				title : this.state.title,
				language : this.state.language,
				content : this.state.content
			};

			dispatch(transferCode(code));
			dispatch(pushState(null, `/submitSmells`));
        }
    }

	render() {
		var languages = [
			{value: "Java"},
			{value: "Python"},
			{value: "C"},
			{value: "C++"}
		];

		const { user } = this.props;

		return (
			<div className="component-submit">
				<h2>Submit Code</h2>
				<p>Logged in as <span className="profile">{ user.username }</span></p>
                <form>
					<label className="title">Title<input onChange={this.handleTitleChange}/></label>
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

SubmitCode.propTypes = {
	user: PropTypes.object
}

function mapStateToProps(state) {
	var user = state.user.user; 

	return { user }
}

export default connect(mapStateToProps)(SubmitCode);
