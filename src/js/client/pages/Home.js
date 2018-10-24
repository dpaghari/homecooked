import React from 'react';

import Dashboard from './Dashboard';
import MealPlanner from '../components/MealPlan.js';

// Components
import Login from '../components/Login';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { appState, updateAppState, logInSuccess } = this.props;
    if (appState.currentUser)
      return (
        <div>
          <Dashboard updateAppState={updateAppState} appState={appState} />
          <MealPlanner />
        </div>
      );
    else
      return (
        <Login
          updateAppState={updateAppState.bind(this)}
          logInSuccess={logInSuccess.bind(this)}
        />
      );
  }
}
