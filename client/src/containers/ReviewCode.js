import React, { PropTypes, Component } from 'react';
import { fetchCode, selectCode } from '../actions/code';
import { connect } from 'react-redux';
import CodeBlock from '../components/CodeBlock';


class ReviewCode extends Component {
    constructor(props) {
        super(props);
        this.clickAction = this.clickAction.bind(this);
        this.selectCodeSmell = this.selectCodeSmell.bind(this);
        this.state = {
            codeSmellId: -1
        }
    }

    componentDidMount() {
        const { dispatch, id, codeReview, codeSmells } = this.props;
        console.log(dispatch);
        dispatch(fetchCode(id));
    }
    
    componentWillReceiveProps(nextProps) {
        if(!this.props.codeReview || nextProps.codeReview.id !== this.props.codeReview.id) {
            const { dispatch, id, codeReview, codeSmells } = nextProps;
            dispatch(fetchCode(id));
        }
    }

    clickAction(lineNumber) {
        this.props.dispatch(selectCode(lineNumber, this.state.codeSmellId));
    }

    selectCodeSmell(id) {
        this.setState({
            'codeSmellId': id
        });
    }

    render() {

        const { id, codeReview, codeSmells } = this.props;
        var content = "";

        if(codeReview) {
            content = codeReview.content;
        }
        console.log("Props: " + this.props);

        return (
            <div className="component-review">
                <h2>Review Code</h2>
                <div>
                    {codeSmells.map((codeSmell) => {
                        <button
                            type="button"
                            key={codeSmell.id}
                            onClick={() => this.selectCodeSmell(codeSmell.id)}>
                        {codeSmell.name}
                        </button>
                    })}
                </div>
                
            </div>
        );

    }

}

ReviewCode.propTypes = {
    id: PropTypes.string,
    codeReview: PropTypes.object,
    codeSmells: PropTypes.array,
}

function mapStateToProps(state) {
    var id = state.router.params.id;
    var codeReview = state.code.codeReview;
    var codeSmells = state.smells.codeSmells || [];

    return {
        id,
        codeReview,
        codeSmells
    }
}

export default connect(
mapStateToProps)(ReviewCode);
