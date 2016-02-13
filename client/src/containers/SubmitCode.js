import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import codeService from '../api/code';

class SubmitCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '(e.g. CS 242 - Chess)', 
			language: {value: 'Java'}
		};
		// React components in ES6 no long autobinds this to nonReact methods
		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({
			value: evt.target.value
		});
	}
	handleSelect(evt) {
		this.setState({
			language: evt.target.value
		});
	}
    handleSubmit(evt) {
        codeService.submitCode(this.state.value, this.state.language);
    }
	render() {
		var languages = [
			{value: 'Java'},
			{value: 'Python'},
			{value: 'C'},
			{value: 'C++'}
		];
		return (
			<div className="component-submit">
				<h2>Submit Code</h2>
				<p>Logged in as <span className="profile">John</span></p>
                <form>
					<label className="title">Title<input placeholder={this.state.value} onChange={this.handleChange}/></label>
					<label><span>Language</span>
						<select onChange={this.handleSelect}>
							<option value="" disabled selected>select a language</option>
							{
								languages.map(function(language) {
									return (<option id={language.id} value={language.value}>{language.value}</option>)
								})
							}
						</select>
					</label>
					<textarea placeholder="paste or drag your code here">
					</textarea>
					<button
                        onClick={this.handleSubmit}
                        type="button"
                        className="cta">
                        Submit
                    </button>
                </form>
			</div>
		)
	}
}

export default connect(
)(SubmitCode);
