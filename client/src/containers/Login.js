import React, { PropTypes, Component } from 'react';
import reactMixin from 'react-mixin';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;
    }
 
    handleLogin() {
        this.props.dispatch(loginUser(this.state.email, this.state.password)); 
    }

    handleUsername(evt) {
        this.setState({
            'email': evt.target.value
        });
    }

    handlePassword(evt) {
        this.setState({
            'password': evt.target.value
        });
    }

    render () {
        return ( 
            <div>
                <h2>Login</h2>
                <input type='text' onChange={this.handleUsername} />
                <input type='password' onChange={this.handlePassword} />
                <button onClick={this.handleLogin}>Login</button>
            </div>
            );
    
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
}

function mapStateToProps(state) {
    var isAuthenticated = state.auth.isAuthenticated;

    return {
        isAuthenticated
    }
}

export default connect(
mapStateToProps)(Login);
