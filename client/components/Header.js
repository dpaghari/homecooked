import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header class="c-header">
        <h1>Homecooked</h1>
        <nav class="c-header__nav">
          <Link class="c-header__nav-item" to="/">Home</Link>
          <Link class="c-header__nav-item" to="/cookbook">Cookbook</Link>
          <Link class="c-header__nav-item" to="/explore">Explore</Link>
          <Link class="c-header__nav-item" to="/settings">Settings</Link>
          <Link onClick={this.handleLogoutUser.bind(this)} class="c-header__nav-item" to="/">Logout</Link>
        </nav>
      </header>
    );
  }

  handleLogoutUser(e) {
    e.preventDefault();
    this.props.updateAppState({
      loggedIn: false,
      currentPage: 'Home',
      currentUser: {}
    });
  }
}
