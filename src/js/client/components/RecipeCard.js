import React from 'react';

export default class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOwnerContainer() {
    function _getRandomProfileAvatar() {

      const avatars = [
        "/img/avatar-1.png",
        "/img/avatar-2.png",
        "/img/avatar-3.png",
        "/img/avatar-4.png",
        "/img/avatar-5.png",
        "/img/avatar-6.png",
      ];
      const randomIdx = Math.abs(Math.floor(Math.random() * avatars.length - 1));
      return avatars[randomIdx];
    }

    let { profile_picture } = this.props;
    const { owner, shouldRenderOwner } = this.props;
    if (!shouldRenderOwner) return null;
    if (!profile_picture) {
      profile_picture = _getRandomProfileAvatar();
    }

    return (
      <div class="c-recipe-card__owner">
        <img src={profile_picture} class="c-recipe-card__user-image" />
        <p class="c-recipe-card__owner-name">{owner}</p>
      </div>
    );
  }

  render() {
    const {
      onClick,
      imgUrl,
      recipeName,
      cookTime,
      servingSize,
      description,
    } = this.props;

    return (
      <li
        onClick={onClick}
        class="c-recipe-card"
      >
        <div class="c-recipe-card__wrapper">
          <img class="c-recipe-card__image" src={imgUrl} alt={recipeName} />
          <div class="c-recipe-card__info">
            <div class="c-recipe-card__info-header">
              <strong class="c-recipe-card__name">{recipeName}</strong>
              <div class="c-recipe-card__stats">
                <div class="c-recipe-card__serving-size">
                  <i class="fa fa-user-friends"></i>
                  <span class="c-recipe-card__serving-size">{`${servingSize}`}</span>
                </div>
                <div class="c-recipe-card__cook-time">
                  <i class="fa fa-clock"></i>
                  <span style={{ "marginRight": "4px" }}>{cookTime && cookTime.hours && `${cookTime.hours}h`}</span>
                  <span>{cookTime && cookTime.minutes && `${cookTime.minutes}m`}</span>
                </div>
              </div>
            </div>

            <div class="c-recipe-card__user-lockup">
              { this.renderOwnerContainer() }
            </div>
            <p class="c-recipe-card__blurb">{description}</p>
          </div>
        </div>
      </li>
    );
  }
}
