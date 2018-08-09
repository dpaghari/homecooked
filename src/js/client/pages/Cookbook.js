import React from 'react';

import Login from '../components/Login';
import Recipe from '../components/Recipe';
import RecipeForm from '../components/RecipeForm';

import axios from 'axios';

export default class Cookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: [],
      recipeForm: {
        isActive: false
      },
      recipeDetail: {
        isActive: false,
        recipe: {}
      },
    };
  }

  componentWillMount() {
    let { appState } = this.props;
    // let userId = appState.currentUser.user_id;
    // axios.post('/api/get_user_recipes', {
    //   user_id: userId
    // })
    // .then((response) => {
    //
    //   if(response.data.length) {
    //     this.setState({
    //       userRecipes: response.data
    //     });
    //   }
    // });
  }

  updateRecipes(newRecipes) {
    this.setState({recipeForm: newRecipes});
  }

  render () {
    let { appState, updateAppState } = this.props;
    let { recipe, isActive, idx } = this.state.recipeDetail;
    console.log('this.state.userRecipes', appState.currentUser);
    if(appState.currentUser){
      return (
        <section class="c-cookbook">
          <h1 class="c-cookbook__heading">Cookbook</h1>
          <div class="c-cookbook__page container">
            {this.renderUserRecipes()}
            <Recipe
              recipe={recipe}
              isActive={isActive}
              renderIngredientList={this.renderIngredientList}
              renderInstructionsList={this.renderInstructionsList}
              deleteRecipe={this.deleteRecipe.bind(this, recipe, idx)}
              handleToggleRecipeDetail={this.handleToggleRecipeDetail.bind(this, recipe, idx) } />
          </div>
          <RecipeForm appState={this.props.appState}
                      renderInstructionsList={this.renderInstructionsList}
                      renderIngredientList={this.renderIngredientList}
                      isActive={this.state.recipeForm.isActive}
                      userRecipes={this.state.userRecipes}
                      updateRecipes={this.updateRecipes.bind(this)}
                      handleToggleRecipeForm={this.handleToggleRecipeForm.bind(this)} />
        </section>
      );
    }
    else {
      // window.location.href = '/';
      console.log(this.props);
      this.props.history.push('/');
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderUserRecipes() {
    if(this.state.userRecipes.length) {
      return (
        <section class="c-user-recipes container">
          <ul class="c-user-recipes__list">
            {this.renderRecipesList()}
            <a onClick={this.handleToggleRecipeForm.bind(this)} class="c-cookbook__add-recipe" href="#">
              <i class="fa fa-plus"></i>
            </a>
          </ul>
        </section>
      );
    }
    else {
      return (
        <section class="c-user-recipes container">
          <ul class="c-user-recipes__list">
            <a onClick={this.handleToggleRecipeForm.bind(this)} class="c-cookbook__add-recipe" href="#">
              <i class="fa fa-plus"></i>
            </a>
          </ul>
        </section>
      );
    }
  }

  renderRecipesList() {
    let recipes = this.state.userRecipes;
    if(recipes.length > 0) {
      return recipes.map(this.renderRecipe.bind(this));
    }
    else return null;
  }

  renderRecipe(recipe, idx) {

    let { appState } = this.props;
    const profile_picture = appState.currentUser.profile_picture;

    recipe.ingredients = typeof recipe.ingredients === 'string' ? JSON.parse(recipe.ingredients) : recipe.ingredients;
    recipe.instructions = typeof recipe.instructions === 'string' ? JSON.parse(recipe.instructions) : recipe.instructions;
    let imgUrl = recipe.recipe_image ? recipe.recipe_image : './img/placeholder-recipe.jpg';
    return (
      <li onClick={this.handleToggleRecipeDetail.bind(this, recipe, idx)} key={idx} class="c-user-recipes__list-item">
        <div class="c-user-recipes__wrapper">
          <img class="c-user-recipes__image" src={imgUrl} alt={recipe.name} />
          <div class="c-user-recipes__info">
            <strong class="c-user-recipes__name">{recipe.name}</strong>
            <div class="c-user-recipes__user-lockup">
              <img src={profile_picture} class="c-user-recipes__user-image"/>
              <span class="c-user-recipes__cook-time">{recipe.cooking_time}</span>
              <span class="c-user-recipes__serving-size">{recipe.serving_size}</span>
            </div>
            <p class="c-user-recipes__blurb">{recipe.blurb}</p>
          </div>
        </div>

      </li>
    );
  }



  deleteRecipe(recipe, recipeIndex, e) {
    e.preventDefault();
    console.log('recipe:', recipe);
    axios.post('/api/delete_recipe', {recipe_id: recipe.recipe_id})
    .then((response) => {
      this.state.userRecipes.splice(recipeIndex, 1);
      this.setState({userRecipes: this.state.userRecipes});
      this.handleToggleRecipeDetail(recipe, recipeIndex);
    })
    .catch((err) => {
      throw err;
    });
  }

  renderIngredientList(ingredients) {
    if(ingredients !== null && ingredients.length > 0) {
      return ingredients.map((ingredient, idx) => {
        return (
          <li key={idx} class="c-ingredient">
            <span class="c-ingredient__qty">{ingredient.quantity}</span>
            <span class="c-ingredient__name">{ingredient.name}</span>
          </li>
        )
      });
    }
    else return null;
  }

  renderInstructionsList(instructions) {
    if(instructions !== null && instructions.length > 0) {
      return instructions.map((step, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{step.name}</p>
          </li>
        )
      });
    }
    else return null;
  }

  handleToggleRecipeForm() {
    this.setState({
      recipeForm: {
        isActive: !this.state.recipeForm.isActive
      }
    });
  }

  handleToggleRecipeDetail(recipe, idx, e) {
    if(e) e.preventDefault();
    this.setState({
      recipeDetail: {
        isActive: !this.state.recipeDetail.isActive,
        recipe,
        idx
      }
    });
  }


}
