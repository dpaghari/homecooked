import React from 'react';
import { render } from 'react-dom';
import { setCookie, getCookie } from '../../util.js';
import httpClient from '../../httpClient.js';

import Header from '../components/Header';
// import Footer from '../components/Footer';

// TO-DO: Set up Redux to handle Application State
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loggedIn: false,
      currentPage: 'Home',
      currentUser: httpClient.getCurrentUser()
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentWillMount() {

    // const isLoggedIn = getCookie('isLoggedIn') ? JSON.parse(getCookie('isLoggedIn')) : false;
    if(this.state.currentUser) {
      this.setState({
        // loggedIn: true,
        currentUser: httpClient.getCurrentUser()
      });
    }
    else {
      this.setState({
        // loggedIn: false,
        currentUser: null
      });
    }
  }
  componentDidMount() {


  }

  render() {
    // this.props.children = React Router route component
    // pass the appState to the route component
    let page = React.cloneElement(this.props.children, {
      appState: this.state,
      updateAppState: this.updateAppState.bind(this),
      logInSuccess: this.onLoginSuccess.bind(this),
      currentUser: this.state.currentUser,
    });

    return (
      <main>
        <Header updateAppState={this.updateAppState.bind(this)} onLogOut={this.logOutHandler.bind(this)}/>
          {page}
      </main>
    );
  }

  updateAppState(newState) {
    if(newState) this.setState(newState);
  }

  onLoginSuccess() {
		this.setState({
      loggedIn: true,
      currentUser: httpClient.getCurrentUser()
    })
  }

  logOutHandler(){
    httpClient.logOut()
    this.setState({
      curentUser:null
    })
  }




}
