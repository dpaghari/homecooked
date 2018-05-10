import React from 'react';
import { render } from 'react-dom';

import Header from '../components/Header';
// import Footer from '../components/Footer';

// TO-DO: Set up Redux to handle Application State
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      currentPage: 'Home',
      currentUser: {
        user_id: 2,
        name: 'Daniel',
        profile_picture: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/31131270_10214106691836126_6397608758125527040_n.jpg?_nc_cat=0&oh=aed28f41fa138de102820680eb3d9a8a&oe=5B957335'
      }
    };
  }

  componentWillMount() {}
  componentDidMount() {}

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
      </main>);
  }

  updateAppState(newState) {
    if(newState) this.setState(newState);
  }

}
