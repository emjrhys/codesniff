import React, { PropTypes, Component } from 'react';

const CodeLine = ({ line, lineNumber, clickAction, highlight }) => (

		<div className={(highlight && highlight.line === lineNumber) ? "highlight" : ""} onClick={() => clickAction(lineNumber)}>
			<span className="lineNumber">{lineNumber}</span> <span className="code">{line}</span>
		</div>

	)

export default CodeLine