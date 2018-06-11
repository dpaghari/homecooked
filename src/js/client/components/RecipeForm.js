import React from 'react';
import axios from 'axios';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false || this.props.isActive,
      newRecipe: {
        name: '',
        recipe_image: '',
        cook_time: '',
        serving_size: '',
        blurb: '',
        ingredients: [],
        instructions: []
      },
      currentStep: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive
    })
  }

  render() {
    console.log(this.state);
    if(this.state.isActive){
      return (<div class="c-new-recipe l-modal">
        <button onClick={this.handleToggleRecipeForm.bind(this)}>Close</button>
        <form class="c-new-recipe__form" onSubmit={this.handleAddNewRecipe.bind(this)}>
          { this.renderCurrFieldSet() }
        </form>

        { this.renderNewRecipePreview() }
      </div>);
    }
    else return null;
  }

  handleToggleRecipeForm() {
    this.props.handleToggleRecipeForm();
    this.setState({
      currentStep: 0
    });
  }


  handleAddNewRecipe(e) {
    e.preventDefault();

    let newRecipe = Object.assign(this.state.newRecipe, {user_id: this.props.appState.currentUser.user_id});
    this.props.userRecipes.push(newRecipe);
    axios.post('/api/add_recipe', newRecipe)
    .then((response) => {
      console.log(response);
      this.props.updateRecipes(this.props.userRecipes);
    })
    .catch((err) => {
      throw err;
    });

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
          {/* {<button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>} */}
          <button class="c-new-recipe__submit" type="submit">Add To Cookbook</button>
        </fieldset>
      );
    }
  }

  renderNewRecipePreview() {
    console.log(this.state.newRecipe);
    return (
      <div class="c-new-recipe__preview">
      <strong>Ingredients</strong>
      <ul class="c-ingredient-list">
        { this.props.renderIngredientList(this.state.newRecipe.ingredients) }
      </ul>

      <strong>Instructions</strong>
      <ol class="c-instruction-list">
        { this.props.renderInstructionsList(this.state.newRecipe.instructions) }
      </ol>
      </div>
    );
  }

  handleClickNext() {
    let { currentStep } = this.state;
    // console.log(this.refs);
    if(currentStep < 2) {

      if( currentStep === 0) this.saveFieldsToState();

      this.state.currentStep++;
      this.setState({
        currentStep: this.state.currentStep
      });
    }
    // else {
    //   this.setState({
    //     currentStep: 0
    //   });
    // }
  }

  saveFieldsToState() {

    const { recipeName, recipeImage, recipeCookTime, recipeServing, recipeDescription } = this.refs;

    this.state.newRecipe = Object.assign(this.state.newRecipe, {
      name: recipeName.value,
      recipe_image: recipeImage.value,
      cook_time: recipeCookTime.value,
      serving_size: recipeServing.value,
      description: recipeDescription.value
    });
    this.setState({
      newRecipe: this.state.newRecipe
    });

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
    let newInstruction = {
      name: recipeInstruction.value
    };

    this.state.newRecipe.instructions.push(newInstruction);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {instructions: this.state.newRecipe.instructions});
    this.setState({
      newRecipe: this.state.newRecipe
    });

    recipeInstruction.value = "";
    recipeInstruction.focus();
  }


}
