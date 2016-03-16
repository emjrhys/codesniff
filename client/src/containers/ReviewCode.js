import React, { PropTypes, Component } from 'react';
import { fetchCode, selectCode } from '../actions/code.js';
import { addDefaultCodeSmells } from '../actions/smells';
import { getUserInfo } from '../actions/user.js';
import { connect } from 'react-redux';
import CodeBlock from '../components/CodeBlock';


class ReviewCode extends Component {
    constructor(props) {
        super(props);
        this.clickAction = this.clickAction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectCodeSmell = this.selectCodeSmell.bind(this);
        this.state = {
            className: "",
            codeSmellName: ""
        }
    }

    componentDidMount() {
        const { dispatch, id, userid, codeReview, codeSmells, selectedLines } = this.props;
        dispatch(fetchCode(id));
        dispatch(getUserInfo());
    }
    
    componentWillReceiveProps(nextProps) {
        // TODO Add (nextProps.codeReview.id !== this.props.codeReview.id) once auth is fixed
        // TODO Change && to ||
        if(!this.props.codeReview && 
            (this.state.codeSmellName !== "")) {
            const { dispatch, id, userid, codeReview, codeSmells, selectedLines } = nextProps;
            dispatch(fetchCode(id));
        }  
    }

    clickAction(lineNumber) {
        const { dispatch, id, userid, codeReview, codeSmells, selectedLines } = this.props;
        if (this.state.codeSmellName !== "") {
            dispatch(selectCode(lineNumber, this.state.codeSmellName));
        }
    }

    handleSubmit() {
        const { dispatch, id, userid, codeReview, codeSmells, selectedLines } = this.props;
        // Uncomment below for debugging purposes
        /* for (var i in selectedLines)
            console.log(selectedLines[i].line + " " + selectedLines[i].smell);
        console.log("USER ID " + userid); */
        dispatch(addDefaultCodeSmells(userid, id, selectedLines));
    }

    selectCodeSmell(name) {
        this.setState({
            codeSmellName: name
        });
    }

    render() {

        const { id, codeReview, codeSmells, selectedLines } = this.props;
        var content = "";

        if(codeReview) {
            // TODO Define a delimiter
            content = codeReview.content.split("\\n");
            for (var i = 0; i < content.length; i++) {
                content[i] = {
                    lineNumber: i + 1,
                    line: content[i],
                };
            }   
        }

        return (
            <div className="component-review">
                <h2>Review Code</h2>
                <div>
                    {
                        codeSmells.map((codeSmell) => {
                            return(<button 
                                    className="codesmell"
                                    key={codeSmell.id}
                                    onClick={() => this.selectCodeSmell(codeSmell.name)}>
                                    {codeSmell.name}
                                </button>)
                        })
                    }
                </div>
                <div className="codearea">
                    <CodeBlock
                        className={this.state.className}
                        codeLines={content}
                        clickAction={this.clickAction}
                        selectedLines={selectedLines}
                    />  
                </div> 
                <button
                    onClick={this.handleSubmit}
                    type="button"
                    className="cta">
                    Submit
                </button>
            </div>
        );

    }

}

ReviewCode.propTypes = {
    id: PropTypes.string,
    userid: PropTypes.number,
    codeReview: PropTypes.object,
    codeSmells: PropTypes.array,
    selectedLines: PropTypes.array
}

// TODO Move code smells either into DB or to config
// TODO Error checking
function mapStateToProps(state) {
    var id = state.router.params.id;
    var userid = state.user.user.id; 
    var codeReview = state.code.codeReview;
    var codeSmells = state.smells.codeSmells || [
        {id: 1, name: "duplicate code"},
        {id: 2, name: "long methods/functions"},
        {id: 3, name: "large classes"},
        {id: 4, name: "long parameter list"},
        {id: 5, name: "message chain"},
        {id: 6, name: "feature envy"},
        {id: 7, name: "switch statements, nested ifs"},
        {id: 8, name: "temporary fields"},
        {id: 9, name: "refused bequest"},
        {id: 10, name: "too many bugs"},
        {id: 11, name: "too hard to understand"},
        {id: 12, name: "too hard to change"}];
    var selectedLines = state.code.selectedLines || [];

    return {
        id,
        userid,
        codeReview,
        codeSmells,
        selectedLines
    }
}

export default connect(mapStateToProps)(ReviewCode);
