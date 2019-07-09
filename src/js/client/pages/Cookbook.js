import React from 'react';

import Login from '../components/Login';
import RecipeDetail from '../components/RecipeDetail';
import RecipeForm from '../components/RecipeForm';
import RecipePage from './RecipePage';
 
import httpClient from '../../httpClient.js';

export default class Cookbook extends RecipePage {
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: [],
      recipeForm: {
        isActive: false
      },
      recipeDetail: {
        isActive: false,
        recipe: null,
        edit: false
      }
    };
  }

  componentWillMount() {
    let { appState } = this.props;
  }

  componentDidMount() {
    if (this.props.currentUser) {
      httpClient.userRecipes(this.props.currentUser._id).then(response => {
        this.setState({
          userRecipes: response.data
        });
      });
    }
  }

  addNewRecipe(recipe) {
    this.setState({
      userRecipes: [...this.state.userRecipes, recipe]
    });
  }

  render() {
    let { appState, updateAppState } = this.props;
    let { recipe, isActive, idx } = this.state.recipeDetail;
    if (appState.currentUser) {
      return (
        <section class="c-cookbook">
          <h1 class="c-cookbook__heading">Cookbook</h1>
          <div class="c-cookbook__page container">
            {this.renderUserRecipes(this.state.userRecipes)}
            <RecipeDetail
              recipe={recipe}
              isActive={isActive}
              editIsActive={this.state.recipeDetail.edit}
              renderIngredientList={this.renderIngredientList.bind(this)}
              renderInstructionsList={this.renderInstructionsList.bind(this)}
              userRecipes={this.state.userRecipes}
              deleteRecipe={this.deleteRecipe.bind(this)}
              editForm={this.handleEditForm.bind(this)}
              handleToggleRecipeDetail={this.handleToggleRecipeDetail.bind(this)}
            />
          </div>
          <RecipeForm
            appState={this.props.appState}
            renderInstructionsList={this.renderInstructionsList}
            renderIngredientList={this.renderIngredientList}
            isActive={this.state.recipeForm.isActive}
            addNewRecipe={this.addNewRecipe.bind(this)}
            handleToggleRecipeForm={this.handleToggleRecipeForm.bind(this)}
            currentUser={this.props.currentUser}
            props={this.props}
          />
        </section>
      );
    } else {
      this.props.history.push('/');
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderUserRecipes(recipes) {
    if (this.state.userRecipes.length) {
      return (
        <section class="c-user-recipes container">
          <ul class="c-user-recipes__list">
            {this.renderRecipesList(recipes)}
            <a
              onClick={this.handleToggleRecipeForm.bind(this)}
              class="c-cookbook__add-recipe"
              href="#"
            >
              <i class="fa fa-plus" />
            </a>
          </ul>
        </section>
      );
    } else {
      return (
        <section class="c-user-recipes container">
          <ul class="c-user-recipes__list">
            <a
              onClick={this.handleToggleRecipeForm.bind(this)}
              class="c-cookbook__add-recipe"
              href="#"
            >
              <i class="fa fa-plus" />
            </a>
          </ul>
        </section>
      );
    }
  }

  renderRecipesList(recipes) {
    if (this.state.userRecipes.length > 0) {
      return recipes.map(this.renderRecipe.bind(this));
    } else {
      return null;
    }
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
    let classList =
      idx === 0
        ? 'c-user-recipes__list-item--featured'
        : 'c-user-recipes__list-item';
    return (
      <li
        onClick={this.handleToggleRecipeDetail.bind(this, idx, recipe)}
        key={idx}
        class={classList}
      >
        <div class="c-user-recipes__wrapper">
          <img class="c-user-recipes__image" src={imgUrl} alt={recipe.name} />
          <div class="c-user-recipes__info">
            <strong class=".c-recipe-detail__recipe-name">{recipe.name}</strong>
            <div class="c-user-recipes__user-lockup">
              <img src={profile_picture} class="c-user-recipes__user-image" />
              <span class="c-user-recipes__cook-time">
                {hours && `${hours} h`}
                {minutes && `${minutes} m`}
              </span>
              <span class="c-user-recipes__serving-size">
                {`${recipe.servingSize} servings`}
              </span>
            </div>
            <p class="c-user-recipes__blurb">{recipe.description}</p>
          </div>
        </div>
      </li>
    );
  }

  deleteRecipe(id) {
    httpClient.deleteRecipe(id).then(response => {
      this.setState({
        recipeDetail: {
          ...this.state.recipeDetail,
          isActive: false,
          edit: false
        },
        userRecipes: this.state.userRecipes.filter(recipe => recipe._id !== id)
      });
    });
  }

  renderIngredientList(ingredients) {
    if (ingredients !== null && ingredients.length > 0) {
      return ingredients.map((ingredient, idx) => {
        return (
          <li key={idx} class="c-ingredient">
            <span class="c-ingredient__qty">{ingredient.quantity}</span>
            <span class="c-ingredient__name">{ingredient.name}</span>
          </li>
        );
      });
    } else return null;
  }

  renderInstructionsList(instructions) {
    if (instructions !== null && instructions.length > 0) {
      return instructions.map((step, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{step.name}</p>
          </li>
        );
      });
    } else return null;
  }

  handleEditForm() {
    this.setState({
      recipeDetail: {
        ...this.state.recipeDetail,
        edit: !this.state.recipeDetail.edit
      }
    });
  }

  handleToggleRecipeForm() {
    this.setState({
      recipeForm: {
        isActive: !this.state.recipeForm.isActive
      }
    });
  }
}
