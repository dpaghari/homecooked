import React from 'react';

export default class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const {
      onClick,
      idx,
      imgUrl,
      recipeName,
      cookTime,
      profile_picture,
      servingSize,
      description
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
              <div class="c-recipe-card__cook-time">
                <i class="fa fa-clock"></i>
                <span style={{"marginRight": "4px"}}>{cookTime && cookTime.hours && `${cookTime.hours}h`}</span>
                <span>{cookTime && cookTime.minutes && `${cookTime.minutes}m`}</span>
              </div>
            </div>

            <div class="c-recipe-card__user-lockup">
              {profile_picture && <img src={profile_picture} class="c-recipe-card__user-image" />}
              <span class="c-recipe-card__serving-size">
                {`${servingSize} servings`}
              </span>
            </div>
            <p class="c-recipe-card__blurb">{description}</p>
          </div>
        </div>
      </li>
    );
  }
}
