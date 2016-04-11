import React, { PropTypes, Components } from 'react';
import CodeLine from './CodeLine';
import { connect } from 'react-redux';

const CodeBlock = ({ className, colorClass, codeLines, clickAction, selectedLines }) => (
			<div>
				{
					Object.keys(codeLines).map((key) =>
						<CodeLine 
							key={key}
							clickAction={clickAction}
							line={codeLines[key].line}
							lineNumber={codeLines[key].lineNumber}
							colorClass= {colorClass ? colorClass : codeLines[codeLines[key].lineNumber - 1].color}
							shouldHighlight={(selectedLines && (selectedLines.length > 0) && selectedLines[selectedLines.length - 1].line === codeLines[key].lineNumber) 
											 || (codeLines[codeLines[key].lineNumber - 1].color && codeLines[codeLines[key].lineNumber - 1].color !== "")}
						/>
					)
				}
			</div>
)

export default CodeBlock