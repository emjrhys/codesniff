import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }

        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;
    }

    handleSignUp(evt) {
        auth.signUp(username, email, password, confirmPassword);
    }

    render() {
    
        return (
                <div>
                    Username
                    <input type='text'
                        valueLink={this.linkState('username')} />
                    Email
                    <input type='email'
                        valueLink={this.linkState('email')} />
                    Password
                    <input type='password'
                        valueLink={this.linkState('password')} />
                    Confirm
                    <input type='password'
                        valueLink={this.linkState('confirmPassword')} />

                    <button onClick={this.handleSignUp}>Sign Up</button>
                </div>
               );
    
    }

}

SignUp.propTypes = {
    isAuthenticated: PropTypes.boolean
}

function mapStateToProps(state) {
    var isAuthenticated = state.auth.isAuthenticated;

    return {
        isAuthenticated
    }
}

export default connect(
mapStateToProps)(SignUp);
