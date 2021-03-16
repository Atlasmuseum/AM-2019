import React, { Component } from 'react'
import { withRouter } from "react-router"

import largeIcon from '../../../../assets/images/largeIcon.png'

import './login.css'

/**
 * Login
 */
export class Login extends Component {
  state = {
      login: '',
      password: '',
      showError: false,
  };


  onChangeLogin = (e) => {
      this.setState({ login: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onLogin = (e) => {
      e.preventDefault();

      const url = 'https://atlasmuseum.net/w/app/api.php';
      const body = {
          action: 'login',
          user: this.state.login,
          password: this.state.password,
      };

      // Paramêtres de requête fetch
      const params = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body),
      };

      fetch(url, params)
      .then(response => response.json())
      .then(data => {
          if (data.result === 'success') {
            const cookieValue = {
                'login': this.state.login,
                'pass': this.state.password,
                'logged': true
            };
            this.createCookie('atlasmuseumapp', JSON.stringify(cookieValue) + '; max-age=' + 365*24*60*60);
            this.props.history.push('/');
          } else {
            this.setState({ showError: true });
          }
      });
  }

  createCookie = (cookieName, cookieValue) => {
    var expires = '';
    document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
  }

  render() {
    const {
        login,
        password,
        showError,
    } = this.state;

    return (
      <div className="loginContainer">
          <div className="loginImage">
              <img src={largeIcon} alt="" />
          </div>
          <form>
              <input
                type="text"
                value={login}
                placeholder="Nom d'utilisateur"
                onChange={this.onChangeLogin}
              />
              <input
                type="password"
                value={password}
                placeholder="Mot de passe"
                onChange={this.onChangePassword}
              />
              {showError && (
                <div className="loginError">
                  Erreur de connexion
                </div>
              )
              }
              <button
                onClick={this.onLogin}
              >
                Confirmer
              </button>
          </form>
      </div>
    )
  }
}

export default withRouter(Login)
