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
      token: null,
      currentPage: 'Home',
      currentUser: httpClient.getCurrentUser(),
      error: null,
    };
  }

  componentDidUpdate() {
  }

  componentWillMount() {
    if (this.state.currentUser) {
      this.setState({
        currentUser: httpClient.getCurrentUser()
      });
    } else {
      this.setState({
        currentUser: null
      });
    }
  }
  componentDidMount() {}

  render() {
    // this.props.children = React Router route component
    // pass the appState to the route component
    let page = React.cloneElement(this.props.children, {
      appState: this.state,
      updateAppState: this.updateAppState.bind(this),
      logInSuccess: this.onLoginSuccess.bind(this),
      currentUser: this.state.currentUser
    });

    return (
      <main>
        {this.renderHeader()}
        {page}
      </main>
    );
  }

  renderHeader() {
    if (!this.state.currentUser) return null;

    return (
      <Header
        updateAppState={this.updateAppState.bind(this)}
        onLogOut={this.logOutHandler.bind(this)}
      />
    );
  }

  updateAppState(newState) {
    if (newState) this.setState(newState);
  }

  onLoginSuccess(token) {
    this.setState({
      currentUser: httpClient.getCurrentUser(),
      token
    });
  }

  logOutHandler() {
    httpClient.logOut();
    this.setState({
      curentUser: null,
      token: null
    });
  }
}
