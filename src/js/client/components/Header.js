import React from 'react';
import { Link } from 'react-router';
import { setCookie, getCookie } from '../../util.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false
    };
  }

  render() {
    const { mobileMenuOpen } = this.state;
    const navClasses = mobileMenuOpen ? "c-header__nav active" : "c-header__nav";
    const menuLinksClasses = mobileMenuOpen ? "c-header__menu-links active" : "c-header__menu-links";
    const menuBtnIcon = mobileMenuOpen ? <i class="fa fa-times" /> : <i class="fa fa-bars"/>;
    return (
      <header class="c-header">
        <h1 class="c-header__logo">
          <Link class="c-header__home-link" to="/">Homecooked</Link>
        </h1>
        <nav class={navClasses}>
          <button class="c-header__menu" onClick={this.handleToggleMobileMenu.bind(this)}>{menuBtnIcon}</button>
          <div class={menuLinksClasses}>
            {/* <Link class="c-header__nav-item" to="/profile">Profile</Link> */}
            {/* <Link class="c-header__nav-item" to="/settings">Settings</Link> */}
            {/* <Link class="c-header__nav-item" to="/messages">Messages</Link> */}
            <Link onClick={this.handleToggleMobileMenu.bind(this)} class="c-header__nav-item" to="/cookbook">Cookbook</Link>
            <Link onClick={this.handleToggleMobileMenu.bind(this)} class="c-header__nav-item" to="/explore">Explore</Link>
            <Link onClick={this.handleLogoutUser.bind(this)} class="c-header__nav-item" to="/">Logout</Link>
          </div>
        </nav>
      </header>
    );
  }

  handleToggleMobileMenu() {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    });
  }

  handleLogoutUser(e) {
    e.preventDefault();
    this.props.onLogOut();
    this.setState({
      mobileMenuOpen: false
    });
    window.location = '/';
  }
}
