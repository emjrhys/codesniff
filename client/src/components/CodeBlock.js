import React, { PropTypes, Components } from 'react';
import CodeLine from './CodeLine';
import { connect } from 'react-redux';

const CodeBlock = ({ codeLines, clickAction }) => (
			<div>
				{codeLines.map((line) => 
					<CodeLine 
						key={line.lineNumber} 
						{...line} 
						onClick={clickAction} 
					/>)}
			</div>
)

export default CodeBlock