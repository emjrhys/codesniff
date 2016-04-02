import React, { PropTypes, Component } from 'react';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        const redirectRoute = this.props.location.query.next || '/welcome';

        this.state = {
            email: '',
            password: '',
            redirectRoute,
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;
    }
 
    handleLogin() {
        console.log(this.props);
        this.props.dispatch(loginUser(this.state.email, this.state.password, this.state.redirectRoute)); 
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
            <div className="component-login">
                <h1>Login</h1>
                <input type='text' placeholder="Username" onChange={this.handleUsername} />
                <input type='password' placeholder="Password" onChange={this.handlePassword} />
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
        isAuthenticated,
    }
}

export default connect(
mapStateToProps)(Login);
