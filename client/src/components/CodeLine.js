import React, { PropTypes, Component } from 'react';

const CodeLine = ({ line, lineNumber, clickAction }) => (

		<div onClick={clickAction}>
			<span className="lineNumber">{lineNumber}</span> <span className="code">{line}</span>
		</div>

	)

export default CodeLine