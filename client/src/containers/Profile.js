import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import CodeList from '../components/CodeList';
import { getUserInfo } from '../actions/user.js';
import { fetchCodesByUserId } from '../actions/code.js';

// TODO make repsonsive design
// TODO figure out how to get all code smells that this user has reviewed
class Profile extends Component {

    constructor(props) {
        super(props);
        this.routeToCodeReview = this.routeToCodeReview.bind(this);
        this.redirectToSubmit = this.redirectToSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, codes, hasNewLoad, isFetchingByUserId } = nextProps;
        if (!isFetchingByUserId && hasNewLoad) {
            if (nextProps.user) {
                dispatch(fetchCodesByUserId(nextProps.user.id));
            }
        }
    }

    routeToCodeReview(codeid) {
        const { dispatch } = this.props;
        if (codeid > 0) {
            dispatch(pushState(null, `/code/${codeid}`));
        }
    }

    redirectToSubmit() {
        const { dispatch } = this.props;
        dispatch(pushState(null, `/submit`));
    }

	render() {

        const { user, codes } = this.props;
        var displayCodes;
        if (codes) {
            displayCodes = (
                    <CodeList 
                        codelist={codes}
                        route={this.routeToCodeReview}
                    />
                );
        }

        return (
            <div className="component-profile">
                <div>
                	<div>
                		<h2>Welcome { user.username }!</h2>
                        <h4>Your email address is { user.email }</h4>
                	</div>
                    <button className="submit" onClick={this.redirectToSubmit}>Add a file</button>
                	<div>
                        {displayCodes}
                    </div>
                </div>
            </div>
        )
    }
};

Profile.propTypes = {
    user: PropTypes.object,
    codes: PropTypes.array,
    hasNewLoad: PropTypes.bool,
    isFetchingByUserId: PropTypes.bool
};

function mapStateToProps(state) {
    var user = state.user.user;
    var codes = state.code.codelist;
    var isFetchingByUserId = state.code.isFetchingByUserId;
    var hasNewLoad = state.code.hasNewLoad;

    return {
        user,
        codes,
        hasNewLoad,
        isFetchingByUserId
    };
}

export default connect(
mapStateToProps)(Profile);
