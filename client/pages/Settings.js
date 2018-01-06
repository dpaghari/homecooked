import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
        <Header updateAppState={updateAppState}/>
        <h1>Settings</h1>
        <Footer/>
        </section>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }
}
