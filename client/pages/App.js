import React from 'react';
import { render } from 'react-dom';

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

  componentWillMount() {}
  componentDidMount() {}

  render() {
    // this.props.children = React Router route component
    // pass the appState to the route component
    return (
      <main>
      {
      React.cloneElement(this.props.children, {
      appState: this.state,
      updateAppState: this.updateAppState.bind(this)})
      }
      </main>);
  }

  updateAppState(newState) {
    if(newState) this.setState(newState);
  }

}
