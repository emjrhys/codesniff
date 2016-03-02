import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    
    }

	render() {

        const { user } = this.props;

        return (
            <div>
                <div>
                	<div>
                		<h2>{ user.username }</h2>
                		<h4> 318 Total Points</h4>
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
