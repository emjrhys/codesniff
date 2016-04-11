import React, { PropTypes, Component } from 'react';

const CodeLine = ({ line, lineNumber, colorClass, clickAction, shouldHighlight }) => (

		<div className={(shouldHighlight) ? colorClass : ""} 
				onClick={() => clickAction(lineNumber)}>
			<span className="lineNumber"> {lineNumber}</span>
			<span className="code"> {line}</span>
		</div>

	)

export default CodeLine