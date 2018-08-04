import React from 'react';
import { render } from 'react-dom';
import { setCookie, getCookie } from '../../util.js';

import Header from '../components/Header';
// import Footer from '../components/Footer';

// TO-DO: Set up Redux to handle Application State
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentPage: 'Home',
      currentUser: {
        // name: "Daniel",
        // user_id: 2,
        // profile_picture: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/31131270_10214106691836126_6397608758125527040_n.jpg?_nc_cat=0&oh=aed28f41fa138de102820680eb3d9a8a&oe=5B957335"
      }
    };
  }

  componentWillMount() {

    const isLoggedIn = getCookie('isLoggedIn') ? JSON.parse(getCookie('isLoggedIn')) : false;
    // const isLoggedIn = true;
    // console.log(isLoggedIn);
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
      updateAppState: this.updateAppState.bind(this)
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

}