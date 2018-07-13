import React from 'react';
import axios from 'axios';
import validator from 'validator';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false || this.props.isActive,
      newRecipe: {
        name: '',
        recipe_image: '',
        cooking_time: '',
        serving_size: '',
        blurb: '',
        ingredients: [],
        instructions: []
      },
      currentStep: 0,
      currentFields: [],
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive
    })
  }

  componentDidUpdate() {
    for (var ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        this.refs[ref].value = "";
      }
    }
  }

  render() {

    if(this.state.isActive){
      return (
        <div class="c-new-recipe l-modal">
          <div class="c-new-recipe__wrapper">
            <div class="c-new-recipe__actions">
              <a href="#" class="c-new-recipe__action" onClick={this.handleToggleRecipeForm.bind(this)}>
                <i class="fa fa-times"></i>
              </a>
            </div>
            <form class="c-new-recipe__form" onSubmit={this.handleAddNewRecipe.bind(this)}>
              { this.renderError() }
              { this.renderCurrFieldSet() }
            </form>
            { this.renderNewRecipePreview() }
          </div>
        </div>);
    }
    else return null;
  }
  renderError() {
    if(this.state.error) {
      return <span style={{'color' : 'red'}}>{this.state.error}</span>;
    }
    else return null;
  }


  renderCurrFieldSet() {
    const { currentStep, error } = this.state;
    if(currentStep === 0) {
      return (
        <fieldset class="c-new-recipe__step--one">
          <label for="recipeName">Recipe Name</label>
          <input name="recipe-name" type="text" ref="recipeName" placeholder="Recipe Name" required data-validators="isEmpty,trim"/>
          <label for="recipeImage">Recipe Image URL</label>
          <input name="recipe-image" type="text" ref="recipeImage" placeholder="Recipe Image URL" required/>
          <label for="recipeCookTime">Cooking Time</label>
          <input name="recipe-cooktime" type="text" ref="recipeCookTime" placeholder="Cooking Time" required/>
          <label for="recipeServing">Serves How many?</label>
          <input name="recipe-serving" type="text" ref="recipeServing" placeholder="Serving Size" required/>
          <label for="recipeDescription">Description</label>
          <textarea name="recipe-desc" cols="100" rows="6" ref="recipeDescription" placeholder="Description" required/>
          <a href="#" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </a>
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
          <a href="#" class="c-new-recipe__add-button" onClick={this.handleAddIngredient.bind(this)}>Add Ingredient<i class="fa fa-plus"></i></a>
          <a href="#" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </a>
        </fieldset>
      );
    }
    else if(currentStep === 2) {
      return (
        <fieldset class="c-new-recipe__step--three">
          <label for="recipeInstruction">Instruction</label>
          <input type="text" ref="recipeInstruction" placeholder="Chop up garlic"/>
          <a href="#" class="c-new-recipe__add-button" onClick={this.handleAddInstruction.bind(this)}>Add Instruction<i class="fa fa-plus"></i></a>
          {/* {<button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>} */}
          <a href="#" onClick={this.handleAddNewRecipe.bind(this)} class="c-new-recipe__submit">
            <i class="fas fa-clipboard-check"></i>
          </a>
        </fieldset>
      );
    }

  }

  renderNewRecipePreview() {
    if(this.state.currentStep === 1) {
      return (
        <div class="c-new-recipe__preview">
          <strong>Ingredients</strong>
          <ul class="c-ingredient-list">
            { this.props.renderIngredientList(this.state.newRecipe.ingredients) }
          </ul>
        </div>
      );
    }
    else if(this.state.currentStep === 2) {
      return(
        <div class="c-new-recipe__preview">
          <strong>Instructions</strong>
          <ol class="c-instruction-list">
            { this.props.renderInstructionsList(this.state.newRecipe.instructions) }
          </ol>
        </div>
      );
    }
  }

  handleClickNext() {
    let { currentStep } = this.state;
    if(currentStep < 2) {
      if( currentStep === 0) this.saveFieldsToState();


      let isValidated = this.checkFields();
      console.log(isValidated);
      if(isValidated.isValid) {
        console.log('hay');
        this.state.currentStep++;
        this.setState({
          currentStep: this.state.currentStep
        });
      }
      else {
        console.log(isValidated.error);
        this.setState({
          error: isValidated.error
        });
      }
    }
  }

  checkFields() {
     console.log(this.refs);
     let isValid = false;
     for (var field in this.refs) {
       if (this.refs.hasOwnProperty(field)) {
         let currField = this.refs[field];
         let validators = currField.dataset.validators;
         if(validator.isEmpty(currField.value)) {
           console.log(currField.name);
            return {
              isValid: false,
              error: `${currField.name} is empty`
            };
         }
       }
     }
     return false;
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
      this.setState({
        currentStep: 0
      });
    })
    .catch((err) => {
      throw err;
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

  saveFieldsToState() {

    const { recipeName, recipeImage, recipeCookTime, recipeServing, recipeDescription } = this.refs;

    let newRecipeName = !validator.isEmpty(recipeName.value) ? validator.trim(recipeName.value) : null;
    let newRecipeImage = !validator.isEmpty(recipeImage.value) && validator.isURL(recipeImage.value) ? validator.trim(recipeImage.value) : null;
    let newRecipeCookTime = !validator.isEmpty(recipeCookTime.value) && validator.isNumeric(recipeCookTime.value) ? validator.trim(recipeCookTime.value) : null;
    let newRecipeServing = !validator.isEmpty(recipeServing.value) && validator.isNumeric(recipeServing.value) ? validator.trim(recipeServing.value) : null;
    let newRecipeDescription = !validator.isEmpty(recipeDescription.value) ? validator.trim(recipeDescription.value) : null;

    if(newRecipeName && newRecipeCookTime && newRecipeServing) {
      this.state.newRecipe = Object.assign(this.state.newRecipe, {
        name: newRecipeName,
        recipe_image: newRecipeImage,
        cooking_time: newRecipeCookTime,
        serving_size: newRecipeServing,
        blurb: newRecipeDescription
      });
      this.setState({
        newRecipe: this.state.newRecipe,
        error: null
      });
    }
    else {
      this.setState({
        error: 'Please fill out the required fields'
      });
    }
  }


}
