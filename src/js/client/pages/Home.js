import React from 'react';

import Dashboard from './Dashboard';

// Components
import Login from '../components/Login';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { appState, updateAppState, logInSuccess } = this.props;
    if(appState.currentUser)
      return <Dashboard updateAppState={updateAppState} appState={appState} />;
    else
      return <Login updateAppState={updateAppState.bind(this)} logInSuccess={logInSuccess.bind(this)}/>;
  }
}
