import React, { PropTypes, Components } from 'react';
import CodeLine from './CodeLine';
import { connect } from 'react-redux';

// NOTE This will modify the existing codeLines object - plz don't fuck shit up
// TODO Create styles (indentation, colors, etc.) 
const CodeBlock = ({ className, codeLines, clickAction, selectedLines }) => (
			<div>
				{
					Object.keys(codeLines).map((key) =>
						<CodeLine 
							key={key}
							line={codeLines[key].line}
							lineNumber={codeLines[key].lineNumber}
							clickAction={clickAction}
							//highlight={selectedLines[selectedLines.length - 1]}
							onClick={clickAction}
						/>
					)
				}
			</div>
)

export default CodeBlock