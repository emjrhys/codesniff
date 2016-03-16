import React, { PropTypes, Component } from 'react';

// className={(highlight && highlight.lineNumber === lineNumber) ? "highlight" : ""}
const CodeLine = ({ line, lineNumber, clickAction, highlight }) => (

		<div onClick={() => clickAction(lineNumber)}>
			<span className="lineNumber">{lineNumber}</span> <span className="code">{line}</span>
		</div>

	)

export default CodeLine