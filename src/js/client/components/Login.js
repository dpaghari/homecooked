import React from 'react';
import axios from 'axios';
import httpClient from '../../httpClient.js'

import { getCookie, setCookie } from '../../util';

// import Footer from './Footer';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name:'',
        password:'',
        imageUrl:'',
      },
      showRegister: false,
      errorMsg: null
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
    const { name, password, imageUrl, } = this.state.fields
    if(this.state.showRegister) {
      return (
        <form class="c-register__form" onChange={this.onInputChange.bind(this)} onSubmit={this.handleSubmitRegister.bind(this)}>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Go Back to Login</a>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="newUserName" placeholder="Username" name="name" value={name}/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="newUserPassword" name="password" value={password}/>
          <label for="confirmNewUserPassword">Confirm Password</label>
          <input class="c-login__input" type="password" ref="confirmNewUserPassword" />
          <label for="newUserPicture">Profile Picture Image URL</label>
          <input class="c-login__input" type="text" ref="newUserPicture" name="imageUrl" value={imageUrl}/>
          <button class="c-login__button" type="submit">Register</button>
        </form>
      );
    }
    else {
      const { name, password} = this.state.fields
      return (
        <form class="c-login__form" onChange={this.onInputChange.bind(this)} onSubmit={this.handleSubmitLogin.bind(this)}>
          {this.renderErrorMsg()}
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="userName" placeholder="Username" name="name" value={name}/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="userPassword" name="password" value={password}/>
          <button class="c-login__button" type="submit">Login</button>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Need an account?</a>
        </form>

      );
    }
  }

  renderErrorMsg() {

    if(this.state.errorMsg === null) return null;
    setTimeout(() => {
      this.setState({errorMsg: null});
    }, 3000);
    return <span style={{
      color: 'white',
      display: 'block',
      background: '#ba312d',
      textAlign: 'center',
      width: '100%',
      padding: '12px',
      margin: '12px 0'
    }} class="c-error-msg">{this.state.errorMsg}</span>;
  }

  handleShowRegister(e) {
    e.preventDefault();
    this.setState({ showRegister: !this.state.showRegister });
  }

  onInputChange(evt){
    console.log(evt.target.value)
    this.setState({
      fields: {
        [evt.target.name]:evt.target.value
      }
    })
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    httpClient.logIn(this.state.logInFields).then(user =>{
      this.setState({
        logInFields:{
          name:'',
          password:''
        }
      })
      if (user){
        this.props.onLoginSuccess(user)
      }
    })

    // let { userName, userPassword } = this.refs;
    // let userCreds = {
    //   'action': 'login',
    //   'user_name': userName.value,
    //   'password': userPassword.value
    // };
    // axios.post('/', userCreds).then((response) => {
    //   if(typeof response.data.appState.error === 'undefined') {
    //     let { loggedIn, currentPage, currentUser } = response.data.appState;
    //     setCookie('isLoggedIn', true);
    //     setCookie('currentUser', JSON.stringify(currentUser));
    //     this.props.updateAppState({
    //       loggedIn,
    //       currentPage,
    //       currentUser
    //     });
    //   }
    //   else {
    //     userName.focus();
    //     this.setState({errorMsg: response.data.appState.error});
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // this.refs.userName.value = this.refs.userPassword.value = "";
}

  handleSubmitRegister(e) {
    e.preventDefault();
    // TO-DO: validation for newUserPicture to be a valid asset url
    let { newUserName, newUserPassword, confirmNewUserPassword, newUserPicture } = this.refs;
    if (newUserPassword.value === confirmNewUserPassword.value) {
      let userCreds = {
        'action': 'register',
        'name': newUserName.value,
        'password': newUserPassword.value,
        'profile_picture': newUserPicture.value
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
      })
      .catch((err) => {
        console.log(err);
      });
      this.refs.userName.value = this.refs.userPassword.value = "";
    }
  }
}
