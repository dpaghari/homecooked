import React from 'react';
import Login from '../components/Login';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    console.log(this.props);
    let { appState, updateAppState } = this.props;
    if(appState.loggedIn) {
      return (
        <section>
          <h1>Settings</h1>
        </section>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }
}
