import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';

import axios from 'axios';

export default class Cookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: [],
      showNewRecipeForm: false,
      newRecipe: {
        name: '',
        cook_time: '',
        serving_size: '',
        description: '',
        ingredients: [],
        instructions: []
      }
    };
  }

  componentWillMount() {
    let { appState } = this.props;
    let userId = appState.currentUser.user_id;
    axios.post('/api/get_user_recipes', {
      user_id: userId
    })
    .then((response) => {
      console.log(response);
      if(response.data.length) {
        this.setState({
          userRecipes: response.data
        });
      }
    });
  }



  render () {
    let { appState, updateAppState } = this.props;
    if(appState.loggedIn){
      return (
        <section class="c-cookbook">
        <Header updateAppState={this.props.updateAppState}/>
        <h1>Cookbook</h1>
        <a onClick={this.handleToggleNewRecipeForm.bind(this)} class="c-cookbook__nav-item" href="#">Add New Recipe</a>
        {this.renderNewRecipeForm()}
        {this.renderUserRecipes()}

        <Footer/>
        </section>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderUserRecipes() {
    if(this.state.userRecipes.length) {
      return (
        <section class="c-user-recipes container">
          <ul class="c-user-recipes__list">
            {this.renderRecipesList()}
          </ul>
        </section>
      );
    }
    else {
      return null;
    }
  }

  renderNewRecipeForm() {
    if(this.state.showNewRecipeForm) {
      return (
        <div class="c-new-recipe">
        <form class="c-new-recipe__form">
          <fieldset>
            <label for="recipeName"></label>
            <input type="text" ref="recipeName" placeholder="Recipe Name" required/>
            <label for="recipeCookTime"></label>
            <input type="text" ref="recipeCookTime" placeholder="Cooking Time" required/>
            <label for="recipeServing"></label>
            <input type="text" ref="recipeServing" placeholder="Serving Size" required/>
            <label for="recipeDescription"></label>
            <textarea cols="100" rows="6" ref="recipeDescription" placeholder="Description" required/>
          </fieldset>
          <fieldset>
            <label for="recipeIngredient"></label>
            <input type="text" ref="recipeIngredient" placeholder="Ingredient"/>
            <label for="recipeIngQty"></label>
            <input type="text" ref="recipeIngQty" placeholder="Qty"/>
            <button type="button" class="c-new-recipe__add-ingredient">Add Ingredient</button>
          </fieldset>
          <fieldset>
            <label for="recipeInstruction"></label>
            <input type="text" ref="recipeInstruction" placeholder="Chop up garlic"/>
            <button type="button" class="c-new-recipe__add-instruction">Add Instruction</button>
          </fieldset>
          <button class="c-new-recipe__submit" type="submit">Add To Cookbook</button>
        </form>
        </div>
      )
    }
    else {
      return null;
    }
  }



  renderRecipesList() {
    let recipes = this.state.userRecipes;
    if(this.state.userRecipes.length > 0) {
      return recipes.map((recipe, idx) => {
        return (
          <li key={idx} class="c-user-recipes__list-item">
            <div class="c-user-recipes__left">
              <strong>{recipe.name}</strong>
              <img src={recipe.recipe_image} alt={recipe.name} />
              <p>Cooking Time: {recipe.cooking_time}</p>
              <p>Serving Size: {recipe.serving_size}</p>
              <p>Description: {recipe.blurb}</p>
            </div>
            <div class="c-user-recipes__right">
              <ul class="c-ingredient-list">
                { this.renderIngredientList(JSON.parse(recipe.ingredients)) }
              </ul>
              <ol class="c-instruction-list">
                { this.renderInstructionsList(JSON.parse(recipe.instructions)) }
              </ol>
            </div>
          </li>
        );
      });
    }
    else return null;
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

  renderInstructionsList(directions) {
    if(directions !== null && directions.length > 0) {
      return directions.map((direction, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{direction.step}</p>
          </li>
        )
      });
    }
    else return null;
  }

  handleToggleNewRecipeForm(e) {
    e.preventDefault();
    this.setState({
      showNewRecipeForm: !this.state.showNewRecipeForm
    });
  }


}
