import React from 'react';
import Login from '../components/Login';
import httpClient from '../../httpClient';

import RecipePage from './RecipePage';
import RecipeDetail from "../components/RecipeDetail";

export default class Explore extends RecipePage {
  constructor(props) {
    super(props);
    this.state = {
      globalRecipes: [],
      recipeDetail: {
        isActive: false,
        recipe: null,
        edit: false,
        idx: null
      }
    };
  }


  componentDidMount() {
    let { appState } = this.props;
    let userId = appState.currentUser._id;
    this.getGlobalRecipes(userId);
  }

  getGlobalRecipes(userId) {
    httpClient.allUnownedRecipes(userId).then((response) => {
      this.setState({
        globalRecipes: response
      });
    });
  }

  render() {

    const { appState, updateAppState } = this.props;
    const { recipe, isActive, idx } = this.state.recipeDetail;

    if(appState.currentUser) {
      return (
        <div class="c-explore">
          <h1 class="c-explore__heading">Explore</h1>
          <div class="c-explore__page container">
            <section class="c-user-recipes container">
              {this.renderRecipesList()}
              <RecipeDetail
                recipe={recipe}
                isActive={isActive}
                recipeIdx={idx}
                editIsActive={this.state.recipeDetail.edit}
                renderIngredientList={this.renderIngredientList.bind(this)}
                renderInstructionsList={this.renderInstructionsList.bind(this)}
                userRecipes={this.state.userRecipes}
                handleToggleRecipeDetail={this.handleToggleRecipeDetail.bind(this)}
                globalRecipes={this.state.globalRecipes}
                currentUser={this.props.appState.currentUser}
              />
            </section>
          </div>
        </div>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderRecipesList() {
    let recipes = this.state.globalRecipes;

    if(recipes.length > 0) {
      return recipes.map((recipe, idx) => {
        recipe.ingredients = typeof recipe.ingredients === 'string' ? JSON.parse(recipe.ingredients) : recipe.ingredients;
        recipe.instructions = typeof recipe.instructions === 'string' ? JSON.parse(recipe.instructions) : recipe.instructions;
        return this.renderRecipe(recipe, idx);
      });
    }
    else return null;
  }

  renderRecipe(recipe, idx) {
    let { appState } = this.props;
    const profile_picture = appState.currentUser.imageUrl;

    recipe.ingredients =
      typeof recipe.ingredients === 'string'
        ? JSON.parse(recipe.ingredients)
        : recipe.ingredients;
    recipe.instructions =
      typeof recipe.instructions === 'string'
        ? JSON.parse(recipe.instructions)
        : recipe.instructions;
    let imgUrl = recipe.imageUrl
      ? recipe.imageUrl
      : './img/placeholder-recipe.jpg';
    let { hours, minutes } = recipe.cookingTime;

    return (
      <li onClick={this.handleToggleRecipeDetail.bind(this, idx, recipe)}
          key={idx}
          class="c-recipe-card"
      >
        <div class="c-recipe-card__wrapper">
          <img class="c-recipe-card__image" src={imgUrl} alt={recipe.name} />
          <div class="c-recipe-card__info">
            <div class="c-recipe-card__info-header">
              <strong class="c-recipe-card__name">{recipe.name}</strong>
              <div class="c-recipe-card__cook-time">
                <i class="fa fa-clock"></i>
                <span style={{ "marginRight": "4px" }}>{hours && `${hours}h`}</span>
                <span>{minutes && `${minutes}m`}</span>
              </div>
            </div>

            <div class="c-recipe-card__user-lockup">
              {profile_picture && <img src={profile_picture} class="c-recipe-card__user-image" />}
              <span class="c-recipe-card__serving-size">
                {`${recipe.servingSize} servings`}
              </span>
            </div>
            <p class="c-recipe-card__blurb">{recipe.description}</p>
          </div>
        </div>
      </li>
    );
  }

  renderIngredientList(ingredients) {
    if(ingredients !== null && ingredients.length > 0) {
      return ingredients.map((ingredient, idx) => {
        return (
          <li key={idx} class="c-ingredient">
            <span>{ingredient.name}</span>
            <span>{ingredient.quantity}</span>
          </li>
        )
      });
    }
    else return null;
  }

  renderInstructionsList(instructions) {
    if(instructions !== null && instructions.length > 0) {
      return instructions.map((instruction, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{instruction.name}</p>
          </li>
        );
      });
    }
    else return null;
  }
}
