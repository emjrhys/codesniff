import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import StyleButton from '../components/StyleButton';
import TabSpan from '../components/TabSpan';
import tabStrategy from '../util/Tab';
import { CompositeDecorator, ContentState, Editor, EditorState, RichUtils } from 'draft-js';

class EditorClass extends Component {

    constructor(props) {
        super(props);
        var content = ContentState.createFromText('public class Example {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}', '\n');
        const decorator = new CompositeDecorator([
            {
                strategy: tabStrategy,
                component: TabSpan,
            }
        ]);
        this.state = {editorState: EditorState.createWithContent(content, decorator)};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});

        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.logState = () => console.log(this.state.editorState.toJS());
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;
        var editor_props = {
            style: {},
            styleEditor: {},
            styleList: {background: '#eee'},
            styleListItem: {},
        }
        
        var className = 'EditorClass-editor';
        var contentState = editorState.getCurrentContent();

        return (
            <div className='EditorClass-root'>
              <HighlightControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle} />
              <div className={className} onClick={this.focus} 
                style={Object.assign(editor_props.style, {
                  display: 'flex'
                })}>
                <ol {...editor_props.list}
                  style={Object.assign(editor_props.styleList, {
                    margin: 0,
                    padding: 0
                  })}>
                  {[...Array(this.state.editorState.getCurrentContent().getBlockMap().size)].map((x, i) =>
                    <li key={i}
                      {...editor_props.listItem}
                      style={Object.assign(editor_props.styleListItem, {
                        listStylePosition: 'inside'
                      })} />
                  )}
                </ol>
                <div style={{flex: 1}}>
                  <Editor
                    style={editor_props.styleEditor}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={this.onChange} />
                </div>
              </div>
              <input
                onClick={this.logState}
                type='button'
                value='Log State'
              />
            </div>
        );
    }
}

/* Custom overrides for highlight style. */
const styleMap = {
    YELLOW: {
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
    },
    RED: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    },
    GREEN: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    BLUE: {
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
    PURPLE: {
        backgroundColor: 'rgba(128, 0, 128, 0.5)',
    }

};

var CODE_SMELLS = [     
    {label: 'Bad Naming', style: 'YELLOW'},
    {label: 'Duplicate Code', style: 'RED'},
    {label: 'Excessively Long Identifiers', style: 'BLUE'},
    {label: 'Excessive Use of Literals', style: 'GREEN'},
    {label: 'Large Class', style: 'PURPLE'}
];

const HighlightControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="EditorClass-controls">
            {CODE_SMELLS.map(type =>
              <StyleButton
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style} />
            )}
        </div>
    );
};

ReactDOM.render(
    <EditorClass />,
    document.getElementById('target')
);

export default connect(
)(EditorClass);

