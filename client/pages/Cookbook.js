import React from 'react';
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
      },
      currentStep: 0
    };
  }

  componentWillMount() {
    let { appState } = this.props;
    let userId = appState.currentUser.user_id;
    axios.post('/api/get_user_recipes', {
      user_id: userId
    })
    .then((response) => {

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
        <h1>Cookbook</h1>
        {this.renderCookbookPage()}
        </section>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderCookbookPage() {
    return (
      <div class="c-cookbook__page">
        <a onClick={this.handleToggleNewRecipeForm.bind(this)} class="c-cookbook__nav-item" href="#">Add New Recipe</a>
        {this.renderNewRecipeForm()}
        {this.renderUserRecipes()}
      </div>
    );
  }
  renderNewRecipeForm() {
    if(this.state.showNewRecipeForm) {
      return (
        <div class="c-new-recipe">
          <button onClick={this.handleToggleNewRecipeForm.bind(this)}>Close</button>
          <form class="c-new-recipe__form" onSubmit={this.handleAddNewRecipe.bind(this)}>
            { this.renderCurrFieldSet() }
          </form>

          {/*this.renderNewRecipePreview()*/}
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderCurrFieldSet() {
    const { currentStep } = this.state;
    if(currentStep === 0) {
      return (
        <fieldset class="c-new-recipe__step--one">
          <label for="recipeName">Recipe Name</label>
          <input type="text" ref="recipeName" placeholder="Recipe Name" required/>
          <label for="recipeImage">Recipe Image URL</label>
          <input type="text" ref="recipeImage" placeholder="Recipe Image URL" required/>
          <label for="recipeCookTime">Cooking Time</label>
          <input type="text" ref="recipeCookTime" placeholder="Cooking Time" required/>
          <label for="recipeServing">Serves How many?</label>
          <input type="text" ref="recipeServing" placeholder="Serving Size" required/>
          <label for="recipeDescription">Description</label>
          <textarea cols="100" rows="6" ref="recipeDescription" placeholder="Description" required/>
          <button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>
        </fieldset>
      );
    }
    else if(currentStep === 1) {
      return (
        <fieldset class="c-new-recipe__step--two">
          <label for="recipeIngredient">Ingredient Name</label>
          <input type="text" ref="recipeIngredient" placeholder="Ingredient"/>
          <label for="recipeIngQty">Ingredient Quantity</label>
          <input type="text" ref="recipeIngQty" placeholder="Qty"/>
          <button type="button" class="c-new-recipe__add-ingredient" onClick={this.handleAddIngredient.bind(this)}>Add Ingredient</button>
          <button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>
        </fieldset>
      );
    }
    else if(currentStep === 2) {
      return (
        <fieldset class="c-new-recipe__step--one">
          <label for="recipeInstruction">Instruction</label>
          <input type="text" ref="recipeInstruction" placeholder="Chop up garlic"/>
          <button type="button" class="c-new-recipe__add-instruction" onClick={this.handleAddInstruction.bind(this)}>Add Instruction</button>
          <button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>
          <button class="c-new-recipe__submit" type="submit">Add To Cookbook</button>
        </fieldset>
      );
    }
  }


  handleClickNext() {
    let { currentStep } = this.state;
    if(currentStep < 2) {
      this.state.currentStep++;
      this.setState({
        currentStep: this.state.currentStep
      });
    }
    else {
      this.setState({
        currentStep: 0
      });
    }
  }


  renderNewRecipePreview() {
    return (
      <div class="c-new-recipe__preview">
      <strong>Ingredients</strong>
      <ul class="c-ingredient-list">
        { this.renderIngredientList(this.state.newRecipe.ingredients) }
      </ul>

      <strong>Instructions</strong>
      <ol class="c-instruction-list">
        { this.renderInstructionsList(this.state.newRecipe.instructions) }
      </ol>
      </div>
    );
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


  handleAddIngredient() {
    let { recipeIngredient, recipeIngQty } = this.refs;
    let newIngredient = {
      name: recipeIngredient.value,
      quantity: recipeIngQty.value
    };

    this.state.newRecipe.ingredients.push(newIngredient);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {ingredients: this.state.newRecipe.ingredients});
    this.setState({
      newRecipe: this.state.newRecipe
    });

    recipeIngredient.value = recipeIngQty.value = "";
    recipeIngredient.focus();
  }

  handleAddInstruction() {
    let { recipeInstruction } = this.refs;
    let newInstruction = recipeInstruction.value;

    this.state.newRecipe.instructions.push(newInstruction);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {instructions: this.state.newRecipe.instructions});
    this.setState({
      newRecipe: this.state.newRecipe
    });
    recipeInstruction.value = "";
    recipeInstruction.focus();
  }

  handleAddNewRecipe(e) {
    e.preventDefault();
    let { recipeName, recipeCookTime, recipeServing, recipeDescription, recipeImage } = this.refs;
    let ingredients = this.state.newRecipe.ingredients;
    let instructions = this.state.newRecipe.instructions;

    let newRecipe = {
      user_id: this.props.appState.currentUser.user_id,
      name: recipeName.value,
      cooking_time: recipeCookTime.value,
      serving_size: recipeServing.value,
      recipe_image: recipeImage.value,
      ingredients,
      instructions,
      blurb: recipeDescription.value
    };
    this.state.userRecipes.push(newRecipe);
    axios.post('/api/add_recipe', newRecipe)
    .then((response) => {
      this.setState({userRecipes: this.state.userRecipes});
    })
    .catch((err) => {
      throw err;
    });

  }



  renderRecipesList() {
    let recipes = this.state.userRecipes;
    if(recipes.length > 0) {
      return recipes.map((recipe, idx) => {
        recipe.ingredients = typeof recipe.ingredients === 'string' ? JSON.parse(recipe.ingredients) : recipe.ingredients;
        recipe.instructions = typeof recipe.instructions === 'string' ? JSON.parse(recipe.instructions) : recipe.instructions;
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
              <div class="c-user-recipes__actions">
                <a onClick={ this.deleteRecipe.bind(this, recipe.recipe_id, idx) } href="#">Delete</a>
              </div>
              <ul class="c-ingredient-list">
                { this.renderIngredientList(recipe.ingredients) }
              </ul>
              <ol class="c-instruction-list">
                { this.renderInstructionsList(recipe.instructions) }
              </ol>
            </div>
          </li>
        );
      });
    }
    else return null;
  }

  deleteRecipe(recipeId, recipeIndex) {
    axios.post('/api/delete_recipe', {recipe_id: recipeId})
    .then((response) => {
      this.state.userRecipes.splice(recipeIndex, 1);
      this.setState({userRecipes: this.state.userRecipes});
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
      return instructions.map((step, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{step}</p>
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
