import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

class ShareLinkModal extends React.Component {

	render() {
		if (this.props.isOpen) {
			return (
				<ReactCSSTransitionGroup
					transitionName={this.props.transitionName}
					transitionEnterTimeout={this.props.transitionEnterTimeout}
					transitionLeaveTimeout={this.props.transitionLeaveTimeout}>
					<div className={this.props.className}>
						<h2>Share Link</h2>
						<p>
							Your code snippet can be reviewed at <span className="modal-link" onClick={() => this.props.clickAction(this.props.codeid)}> /code/{this.props.codeid}</span>
						</p>
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

export default ShareLinkModal;