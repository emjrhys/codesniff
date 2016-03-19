import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user.js';
import { fetchCodesByUserId } from '../actions/code.js';

// TODO offer sorting based on timestamp, title, and language 
// TODO figure out how to get all code smells that this user has reviewed
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            receivedCodes: false,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (this.state.receivedCodes == false) {
            if (nextProps.user) {
                dispatch(fetchCodesByUserId(nextProps.user.id));
            }

            if (nextProps.codes) {
                this.setState({
                    receivedCodes: true
                });
            }
        }
    }

	render() {

        const { user, codes } = this.props;
        var displayCodes;
        if (codes) {
            displayCodes = (
                <div>
                    <h4>Submitted { codes.length } files </h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Time Submitted</th>
                                <th>Title</th>
                                <th>Language</th>
                                <th>Content Preview</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            codes.map((code) => {
                                return(<tr>
                                        <td>{ formatDate(code.date_added) }</td>
                                        <td>{ code.title }</td>
                                        <td>{ code.language }</td>
                                        <td>{ contentDisplay(code.content) }</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                    </table>
                </div>);

            function contentDisplay(content) {
                if (content.length <= 20) {
                    return content;
                } else {
                    return (content.substring(0, 20) + "...");
                }
            }

            function formatDate(jsonDate) {
                var date = new Date(jsonDate);
                return moment(date).format('MM/D/YY, h:mm A');
            }
        }

        return (
            <div>
                <div>
                	<div>
                		<h2>{ user.username }</h2>
                        <h4>{ user.id }</h4>
                        <h4>{ user.email }</h4>
                	</div>

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
    codes: PropTypes.array
};

function mapStateToProps(state) {
    var user = state.user.user;
    var codes = state.code.codelist;

    return {
        user,
        codes
    };
}

export default connect(
mapStateToProps)(Profile);
