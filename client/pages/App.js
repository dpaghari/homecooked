import React from 'react';
import { render } from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showRegister: false
    };
  }

  render() {
    return (
      <main>{this.renderPage()}</main>
    );
  }

  renderPage() {
    if(this.state.loggedIn) {
      return (
        <div class="c-page">
          <header class="c-header">
            <h1>Homecooked</h1>
          </header>
          <div>Logged In Page</div>
          <footer class="c-footer"></footer>
        </div>
      );
    }
    else {
      return (
        <div class="c-login">
          <div class="c-login__header">
            <h1>Homecooked</h1>
          </div>
          <div class="c-login__form-wrapper">
            {this.renderLoginForm()}
          </div>
          <footer class="c-login__footer">
            <div class="c-login__footer__link-group">
            <ul class="c-login__footer__link-group__links">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>

            <ul class="c-login__footer__link-group__social-links">
              <li>
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
              </li>
              <li>
                <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
              <li>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              </li>
              <li>
                <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
              </li>
            </ul>
            </div>
            <p>Homecooked &copy; 2018</p>
          </footer>

        </div>
      )
    }
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
        <form class="c-login__form">

        <label for="userName">Username</label>
        <input class="c-login__input" type="text" ref="userName" placeholder="Username"/>
        <label for="userName">Password</label>
        <input class="c-login__input" type="password" ref="userPassword" />
        <button class="c-login__button" type="submit">Login</button>
        <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Don't have an account?</a>
        </form>

      );
    }
  }

  handleShowRegister(e) {
    e.preventDefault();
    this.setState({ showRegister: !this.state.showRegister });
  }


}
