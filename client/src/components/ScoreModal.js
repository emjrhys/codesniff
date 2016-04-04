import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

class ScoreModal extends React.Component {

	render() {
		if (this.props.isOpen) {
			return (
				<ReactCSSTransitionGroup
					transitionName={this.props.transitionName}
					transitionEnterTimeout={this.props.transitionEnterTimeout}
					transitionLeaveTimeout={this.props.transitionLeaveTimeout}>
					<div className={this.props.className}>
						<h2>Score</h2>
						<p>Your score is {this.props.score}.</p>
						<button onClick={this.props.closeModal}>Exit</button>
					</div>
				</ReactCSSTransitionGroup>);
		} else {
			return <ReactCSSTransitionGroup 
					transitionName={this.props.transitionName}
					transitionEnterTimeout={this.props.transitionEnterTimeout}
					transitionLeaveTimeout={this.props.transitionLeaveTimeout} />;
		}
	}
}

export default ScoreModal;