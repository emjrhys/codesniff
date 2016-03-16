import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user.js';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getUserInfo());    
    }

	render() {

        const { user } = this.props;
        console.log(user);

        return (
            <div>
                <div>
                	<div>
                		<h2>{ user.username }</h2>
                        <h4>{ user.id }</h4>
                        <h4>{ user.email }</h4>
                	</div>

                	<p>4 files submitted | 18 files commented</p>
                </div>
                <table>
                	<caption>Class Leaderboard</caption>
                </table>
            </div>
        )
    }
};

Profile.propTypes = {
    user: PropTypes.object,
};

function mapStateToProps(state) {
    var user = state.user.user;

    return {
        user
    };
}

export default connect(
mapStateToProps)(Profile);
