import React from 'react';
import BaseContainer from './basecontainer.jsx';
import LoginBox from '../components/loginbox.jsx';
import Loadable from '../components/loadable.jsx';

export default class LoginContainer extends BaseContainer {
    constructor(props) {
        super(false, props);
        this.state = {
            loginFailed: false,
            isLoading: false
        };
    }

    renderContainer() {
        return (
            <Loadable isLoading={this.state.isLoading}>
                <LoginBox loginFailed={this.state.loginFailed} handleLogin={this.handleLogin}/>
            </Loadable>
        );
    }

    loadState() {
        if (this.props.deps.sessionInfo.authToken) {
            this.props.deps.navigate('/');
        }
    }

    handleLogin = async(e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;

        let loginResult = await this.props.deps.spxClient.create('User/Login', {
            Email: email,
            Password: password,
            ReturnLocalizedLanguage: false
        });

        this.setState({
            isLoading: false,
            loginFailed: loginResult.error
        });

        if (!loginResult.error) {
            await this.props.deps.setSessionInfo(loginResult.val.d.results.Token, loginResult.val.d.results.Companies);
            this.props.deps.navigate('/');
        }

        return false;
    }
}
