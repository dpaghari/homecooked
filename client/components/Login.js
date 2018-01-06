import React from 'react';
import axios from 'axios';

import Footer from './Footer';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegister: false
    };
  }

  componentWillMount() {}
  componentDidMount() {}

  render() {
    return (
      <section class="c-login">
        <div class="c-login__header">
          <h1>Homecooked</h1>
        </div>
        <div class="c-login__form-wrapper">
          {this.renderLoginForm()}
        </div>
        <Footer />
      </section>
    );
  }

  renderLoginForm() {
    if(this.state.showRegister) {
      return (
        <form class="c-register__form">
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Go Back to Login</a>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="newUserName" placeholder="Username"/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="newUserPassword" />
          <label for="confirmNewUserPassword">Confirm Password</label>
          <input class="c-login__input" type="password" ref="confirmNewUserPassword" />
          <button class="c-login__button" type="submit">Register</button>
        </form>
      );
    }
    else {
      return (
        <form class="c-login__form" onSubmit={this.handleSubmit.bind(this)}>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="userName" placeholder="Username"/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="userPassword" />
          <button class="c-login__button" type="submit">Login</button>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Need an account?</a>
        </form>

      );
    }
  }

  handleShowRegister(e) {
    e.preventDefault();
    this.setState({ showRegister: !this.state.showRegister });
  }

  handleSubmit(e) {
      e.preventDefault();
      let { userName, userPassword } = this.refs;
      let userCreds = {
        'action': 'login',
        'user_name': userName.value,
        'password': userPassword.value
      };

      axios.post('/', userCreds).then((response) => {
        if(response.data.appState) {
          let { loggedIn, currentPage, currentUser } = response.data.appState;

          this.props.updateAppState({
            loggedIn,
            currentPage,
            currentUser
          });
        }
      });
  }
}
