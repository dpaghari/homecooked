import React from 'react';
import axios from 'axios';

// import Footer from './Footer';

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
      </section>
    );
  }

  renderLoginForm() {
    if(this.state.showRegister) {
      return (
        <form class="c-register__form" onSubmit={this.handleSubmitRegister.bind(this)}>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Go Back to Login</a>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="newUserName" placeholder="Username"/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="newUserPassword" />
          <label for="confirmNewUserPassword">Confirm Password</label>
          <input class="c-login__input" type="password" ref="confirmNewUserPassword" />
          <label for="newUserPicture">Profile Picture Image URL</label>
          <input class="c-login__input" type="text" ref="newUserPicture" />
          <button class="c-login__button" type="submit">Register</button>
        </form>
      );
    }
    else {
      return (
        <form class="c-login__form" onSubmit={this.handleSubmitLogin.bind(this)}>
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

  handleSubmitLogin(e) {
      e.preventDefault();
      let { userName, userPassword } = this.refs;
      let userCreds = {
        'action': 'login',
        'user_name': userName.value,
        'password': userPassword.value
      };
      console.log(userCreds);

      axios.post('/', userCreds).then((response) => {

        if(response.data.appState) {
          let { loggedIn, currentPage, currentUser } = response.data.appState;
          console.log(response);
          this.props.updateAppState({
            loggedIn,
            currentPage,
            currentUser
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

      this.refs.userName.value = this.refs.userPassword.value = "";
  }

  handleSubmitRegister(e) {
    e.preventDefault();
    // TO-DO: validation for newUserPicture to be a valid asset url
    let { newUserName, newUserPassword, confirmNewUserPassword, newUserPicture } = this.refs;
    if (newUserPassword.value === confirmNewUserPassword.value) {
      console.log();
      let userCreds = {
        'action': 'register',
        'name': newUserName.value,
        'password': newUserPassword.value,
        'profile_picture': newUserPicture.value
      };

      axios.post('/', userCreds).then((response) => {

        if(response.data.appState) {
          let { loggedIn, currentPage, currentUser } = response.data.appState;
          console.log(response);
          this.props.updateAppState({
            loggedIn,
            currentPage,
            currentUser
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      this.refs.userName.value = this.refs.userPassword.value = "";
    }
  }
}
