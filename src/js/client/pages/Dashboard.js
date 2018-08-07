import React from 'react';
import { Link } from 'react-router';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props)
  }
  render() {
    let { currentUser } = this.props.appState;
    return (
      <section class="c-dashboard container">
        { this.renderUserInfo(currentUser) }
      </section>
    );
  }

  renderUserInfo(currentUser) {
    let placeholder = 'https://vignette.wikia.nocookie.net/sote-rp/images/c/c4/User-placeholder.png/revision/latest?cb=20150624004222';
    let profile_picture = currentUser.profile_picture ? currentUser.profile_picture : placeholder;


    return (
      <section class="c-dashboard__greeting">
        <div class="c-dashboard__profile-pic">
        <img src={currentUser.imageUrl}  alt={currentUser.name}/>
        </div>
        <div class="c-user-info">
          <div class="c-user-info__bio">
            <span class="c-user-info__name">
              <i class="fas fa-user"></i>
              <span>Hi, { currentUser.name }</span>
            </span>
            <span class="c-user-info__location">
              <i class="fas fa-map-marker"></i>
              <span>San Francisco, CA</span>
            </span>
            <span class="c-user-info__styles">
              <i class="fas fa-utensils"></i>
              <span>Asian, Latin, Italian</span>
            </span>
          </div>
          {/*<div class="c-user-info__stats">
            <div class="c-user-info__stat">
              <span class="c-user-info__stat-label">Following</span>
              <span class="c-user-info__following">224</span>
            </div>
            <div class="c-user-info__stat">
              <span class="c-user-info__stat-label">Followers</span>
              <span class="c-user-info__followers">121</span>
            </div>
            <div class="c-user-info__stat">
              <span class="c-user-info__stat-label">Recipes</span>
              <span class="c-user-info__recipe-count">6</span>
            </div>
          </div>*/}
        </div>
      </section>
    );
  }
}
