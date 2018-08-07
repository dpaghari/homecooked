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
        email:'',
        location:''
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
    var { name, password, imageUrl, email, location } = this.state.fields
    if(this.state.showRegister) {
      console.log(this.state.fields)
      return (
        <form class="c-register__form" onChange={this.onInputChange.bind(this)} onSubmit={this.handleSubmitRegister.bind(this)}>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Go Back to Login</a>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="newUserName" placeholder="Username" name="name" value={name}/>
          <label for="email">Email</label>
          <input class="c-login__input" type="text" placeholder="Email" name="email" value={email}/>
          <label for="userName">Password</label>
          <input class="c-login__input" type="password" ref="newUserPassword" name="password" value={password}/>
          <label for="confirmNewUserPassword">Confirm Password</label>
          <input class="c-login__input" type="password" ref="confirmNewUserPassword" />
          <label for="location1">Location</label>
          <input class="c-login__input" type="text" placeholder="Location" name="location" value={location}/>
          <label for="newUserPicture">Profile Picture Image URL</label>
          <input class="c-login__input" type="text" ref="newUserPicture" name="imageUrl" value={imageUrl}/>
          <button class="c-login__button" type="submit">Register</button>
        </form>
      );
    }
    else {
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
    this.setState({ 
      fields: {
        name:'',
        password:'',
        email:''
      },
      showRegister: !this.state.showRegister 
    });
  }

  onInputChange(evt){
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]:evt.target.value
      }
    })
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    httpClient.logIn(this.state.fields).then(user =>{
      this.setState({
        fields:{
          name:'',
          password:''
        }
      })
      console.log(this.props)
      if (user){
        this.props.logInSuccess()
      }
    })
  }

  handleSubmitRegister(e) {
    e.preventDefault();
    httpClient.signUp(this.state.fields).then(user =>{
      this.setState({
        fields:{
          name:'',
          password:'',
          imageUrl:'',
        },
        showRegister: !this.state.showRegister
      })
      if (user){
        this.props.logInSuccess()
      }
    })
  }
}
