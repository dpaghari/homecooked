import React from 'react';
import Login from '../components/Login';
import httpClient from '../../httpClient';

import RecipePage from './RecipePage';
import RecipeDetail from "../components/RecipeDetail";
import RecipeCard from "../components/RecipeCard";

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
  renderUserRecipes(recipes) {
    if (!recipes) return null;
    return (
      <section class="c-user-recipes container">
        <ul class="c-user-recipes__list">
          {this.renderRecipesList(recipes)}
        </ul>
      </section>
    );
  }

  render() {

    const { appState, updateAppState } = this.props;
    const { recipe, isActive, idx } = this.state.recipeDetail;

    if(appState.currentUser) {
      return (
        <div class="c-explore">
          <h1 class="c-explore__heading">Explore</h1>
          <div class="c-explore__page container">
              {this.renderUserRecipes(this.state.globalRecipes)}
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
                shouldShowAddBtn={true}
              />
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
    console.log(recipe, appState);
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
      <RecipeCard
        onClick={this.handleToggleRecipeDetail.bind(this, idx, recipe)}
        key={idx}
        idx={idx}
        imgUrl={imgUrl}
        recipeName={recipe.name}
        cookTime={recipe.cookingTime}
        profile_picture={profile_picture}
        servingSize={recipe.servingSize}
        description={recipe.description}
      />
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
