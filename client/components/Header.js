import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <header class="c-header">
        <h1>Homecooked</h1>
        <nav class="c-header__nav">
          <Link class="c-header__nav-item" to="/">Home</Link>
          <Link class="c-header__nav-item" to="/cookbook">Cookbook</Link>
          <Link class="c-header__nav-item" to="/settings">Settings</Link>
          <a onClick={this.handleLogoutUser.bind(this)} class="c-header__nav-item" href="#">Logout</a>
        </nav>
      </header>
    );
  }

  handleLogoutUser(e) {
    e.preventDefault();
    this.props.updateAppState({
      loggedIn: false
    });
  }



}
