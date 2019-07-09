import React from 'react';
import axios from 'axios';
import httpClient from '../../httpClient.js'

import Slider from "react-slick";

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
      errorMsg: null,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.setState({
      emailOrUsername:this.state.fields.name
    })
  }

  // renderSlider() {
  //   var settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     arrows: false,
  //   };
  //   return (
  //     <Slider {...settings}>
  //       <div style="background-image: url(/img/splash-1.jpg)"></div>
  //       <div style="background-image: url(/img/splash-2.jpg)"></div>
  //       <div style="background-image: url(/img/splash-3.jpg)"></div>
  //       <div style="background-image: url(/img/splash-4.jpg)"></div>
  //     </Slider>
  //   );
  // }

  render() {
    return (
      <section class="c-login">
        <div class="c-login__form-wrapper">
          {this.renderLoginForm()}
        </div>
        <div class="c-login__header">
          <h1 class="c-login__headline">Homecooked</h1>
          <h2 class="c-login__subheadline">The community's cookbook</h2>
        </div>
      </section>
    );
  }

  renderLoginForm() {
    var { name, password, imageUrl, email, location } = this.state.fields
    if(this.state.showRegister) {
      return (
        <form class="c-register__form" onChange={this.onInputChange.bind(this)} onSubmit={this.handleSubmitRegister.bind(this)}>
          <a href="#" onClick={this.handleShowRegister.bind(this)} class="c-register__link">Go Back to Login</a>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="newUserName" name="name" value={name}/>
          <label for="email">Email</label>
          <input class="c-login__input" type="text" name="email" value={email}/>
          <label for="Password">Password</label>
          <input class="c-login__input" type="password" ref="newUserPassword" name="password" value={password}/>
          <label for="confirmNewUserPassword">Confirm Password</label>
          <input class="c-login__input" type="password" ref="confirmNewUserPassword" />
          <label for="location">Location</label>
          <input class="c-login__input" type="text" name="location" value={location}/>
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
          <h1 class="c-login__headline">Homecooked</h1>
          <h2 class="c-login__subheadline">The community's cookbook</h2>
          <label for="userName">Username</label>
          <input class="c-login__input" type="text" ref="userName" name='name' value={name} autoComplete="false" />
          <label for="Password">Password</label>
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
        email:'',
        location:'',
        imageUrl:''
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
      });
      if (user){
        this.props.logInSuccess();
      } else {
        this.setState({
          errorMsg: "Invalid Credentials. Please Try Again."
        });
        this.refs.userName.focus();
      }
    });
  }

  handleSubmitRegister(e) {
    e.preventDefault();
    httpClient.signUp(this.state.fields).then(user =>{
      this.setState({
        fields:{
          name:'',
          password:'',
          imageUrl:'',
          location:'',
          email:'',
        },
        showRegister: !this.state.showRegister
      })
      if (user){
        this.props.logInSuccess()
      }
    })
  }
}
