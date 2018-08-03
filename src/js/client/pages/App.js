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
      loggedIn: false,
      currentPage: 'Home',
      currentUser: {}
    };
  }

  componentWillMount() {

    const isLoggedIn = getCookie('isLoggedIn') ? JSON.parse(getCookie('isLoggedIn')) : false;
    if(isLoggedIn) {
      this.setState({
        loggedIn: true,
        currentUser: JSON.parse(getCookie('currentUser'))
      });
    }
    else {
      this.setState({
        loggedIn: false,
        currentUser: {}
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
      logInSuccess: this.onLoginSuccess.bind(this)
    });

    return (
      <main>
        <Header updateAppState={this.updateAppState.bind(this)}/>
          {page}
      </main>
    );
  }

  updateAppState(newState) {
    if(newState) this.setState(newState);
  }

  onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}


}
