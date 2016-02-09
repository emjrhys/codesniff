import React, { PropTypes, Component } from 'react';
import { fetchCode } from '../actions/codesnippets';
import { connect } from 'react-redux';

class ReviewCode extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, id, codeReview } = this.props;
        dispatch(fetchCode(id));
    }
    
    componentWillReceiveProps(nextProps) {
        if(!this.props.codeReview || nextProps.codeReview.id !== this.props.codeReview.id) {
            const { dispatch, id, codeReview } = nextProps;
            dispatch(fetchCode(id));
        }
    }

    render() {

        const { id, codeReview } = this.props;
        var content = "";

        if(codeReview) {
            content = codeReview.content;
        }

        return (
            <div className="component-review">
                <h2>Review Code</h2>
                { content }
            </div>
        );

    }

}

ReviewCode.propTypes = {
    id: PropTypes.string,
    codeReview: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    var id = state.router.params.id;
    var codeReview = state.code.codeReview;

    return {
        id,
        codeReview
    }
}

export default connect(
mapStateToProps)(ReviewCode);
