import React from 'react';
import axios from 'axios';
import validator from 'validator';
import httpClient from '../../httpClient.js';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false || this.props.isActive,
      newRecipe: {
        user: {},
        name: '',
        imageUrl: '',
        cookingTime: {
          hours: '',
          minutes: '',
          seconds: ''
        },
        servingSize: '',
        description: '',
        ingredients: [],
        instructions: []
      },
      currIng: '',
      currQty: '',
      currInt: '',
      currentStep: 0,
      currentFields: [],
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive
    });
  }

  componentDidUpdate() {
    // for (var ref in this.refs) {
    //   if (this.refs.hasOwnProperty(ref)) {
    //     this.refs[ref].value = "";
    //   }
    // }
  }

  componentDidMount() {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        user: this.props.currentUser
      }
    });
  }

  onInputChange(evt) {
    if (
      evt.target.name === 'hours' ||
      evt.target.name === 'minutes' ||
      evt.target.name === 'seconds'
    ) {
      this.setState({
        newRecipe: {
          ...this.state.newRecipe,
          cookingTime: {
            ...this.state.newRecipe.cookingTime,
            [evt.target.name]: evt.target.value
          }
        }
      });
    } else if (
      evt.target.name === 'currIng' ||
      evt.target.name === 'currQty' ||
      evt.target.name === 'currInt'
    ) {
      this.setState({
        ...this.state,
        [evt.target.name]: evt.target.value
      });
    } else {
      this.setState({
        newRecipe: {
          ...this.state.newRecipe,
          [evt.target.name]: evt.target.value
        }
      });
    }
  }

  render() {
    if (this.state.isActive) {
      return (
        <div class="c-new-recipe l-modal">
          <div class="c-new-recipe__wrapper">
            <div class="c-new-recipe__actions">
              <a
                href="#"
                class="c-new-recipe__action"
                onClick={this.handleToggleRecipeForm.bind(this)}
              >
                <i class="fa fa-times" />
              </a>
            </div>
            <form
              class="c-new-recipe__form"
              onChange={this.onInputChange.bind(this)}
              onSubmit={this.handleAddNewRecipe.bind(this)}
            >
              {this.renderError()}
              {this.renderCurrFieldSet()}
            </form>
            {this.renderNewRecipePreview()}
          </div>
        </div>
      );
    } else return null;
  }
  renderError() {
    if (this.state.error) {
      return <span style={{ color: 'red' }}>{this.state.error}</span>;
    } else return null;
  }

  renderCurrFieldSet() {
    const { currentStep, error, currIng, currQty, currInt } = this.state;
    const {
      name,
      imageUrl,
      servingSize,
      description,
      cookingTime
    } = this.state.newRecipe;
    if (currentStep === 0) {
      return (
        <fieldset class="c-new-recipe__step--one">
          <label for="recipeName">Recipe Name</label>
          <input
            name="name"
            type="text"
            ref="recipeName"
            placeholder="Recipe Name"
            required
            data-validators="isEmpty,trim"
            value={name}
          />
          <label for="recipeImage">Recipe Image URL</label>
          <input
            name="imageUrl"
            type="text"
            ref="recipeImage"
            placeholder="Recipe Image URL"
            required
            data-validators="isEmpty,trim"
            value={imageUrl}
          />
          <label for="recipeCookTime">Cooking Time</label>
          <input
            name="hours"
            type="number"
            ref="recipeCookTime"
            placeholder="Hours"
            required
            data-validators="isEmpty,trim"
            value={cookingTime.hours}
          />
          <input
            name="minutes"
            type="number"
            ref="recipeCookTime"
            placeholder="Minutes"
            required
            data-validators="isEmpty,trim"
            value={cookingTime.minutes}
          />
          <input
            name="seconds"
            type="number"
            ref="recipeCookTime"
            placeholder="Seconds"
            required
            data-validators="isEmpty,trim"
            value={cookingTime.seconds}
          />
          <label for="recipeServing">Serves How many?</label>
          <input
            name="servingSize"
            type="number"
            ref="recipeServing"
            placeholder="Serving Size"
            required
            data-validators="isEmpty,trim"
            value={servingSize}
          />
          <label for="recipeDescription">Description</label>
          <textarea
            name="description"
            cols="100"
            rows="6"
            ref="recipeDescription"
            placeholder="Description"
            required
            data-validators="isEmpty,trim"
            value={description}
          />
          <a
            href="#"
            onClick={this.handleClickNext.bind(this)}
            class="c-new-recipe__next"
          >
            <i class="fas fa-arrow-right" />
          </a>
        </fieldset>
      );
    } else if (currentStep === 1) {
      return (
        <fieldset class="c-new-recipe__step--two">
          <label for="recipeIngredient">Ingredient Name</label>
          <input
            name="currIng"
            type="text"
            ref="recipeIngredient"
            placeholder="Ingredient"
            value={currIng}
          />
          <label for="recipeIngQty">Ingredient Quantity</label>
          <input
            name="currQty"
            type="text"
            ref="recipeIngQty"
            placeholder="Qty"
            value={currQty}
          />
          <a
            href="#"
            class="c-new-recipe__add-button"
            onClick={this.handleAddIngredient.bind(this)}
          >
            Add Ingredient
            <i class="fa fa-plus" />
          </a>
          <a
            href="#"
            onClick={this.handleClickNext.bind(this)}
            class="c-new-recipe__next"
          >
            <i class="fas fa-arrow-right" />
          </a>
        </fieldset>
      );
    } else if (currentStep === 2) {
      return (
        <fieldset class="c-new-recipe__step--three">
          <label for="recipeInstruction">Instruction</label>
          <input
            name="currInt"
            type="text"
            ref="recipeInstruction"
            placeholder="Chop up garlic"
            value={currInt}
          />
          <a
            href="#"
            class="c-new-recipe__add-button"
            onClick={this.handleAddInstruction.bind(this)}
          >
            Add Instruction
            <i class="fa fa-plus" />
          </a>
          {/* {<button type="button" onClick={this.handleClickNext.bind(this)} class="c-new-recipe__next">
            <i class="fas fa-arrow-right"></i>
          </button>} */}
          <a
            href="#"
            onClick={this.handleAddNewRecipe.bind(this)}
            class="c-new-recipe__submit"
          >
            <i class="fas fa-clipboard-check" />
          </a>
        </fieldset>
      );
    }
  }

  renderNewRecipePreview() {
    if (this.state.currentStep === 1) {
      return (
        <div class="c-new-recipe__preview">
          <strong>Ingredients</strong>
          <ul class="c-ingredient-list">
            {this.props.renderIngredientList(this.state.newRecipe.ingredients)}
          </ul>
        </div>
      );
    } else if (this.state.currentStep === 2) {
      return (
        <div class="c-new-recipe__preview">
          <strong>Instructions</strong>
          <ol class="c-instruction-list">
            {this.props.renderInstructionsList(
              this.state.newRecipe.instructions
            )}
          </ol>
        </div>
      );
    }
  }

  handleClickNext() {
    let { currentStep } = this.state;
    if (currentStep < 2) {
      // if( currentStep === 0) {
      //   this.saveFieldsToState();
      //   let isValidated = this.checkFields();

      //   if(isValidated.isValid) {

      //     this.state.currentStep++;
      //     this.setState({
      //       currentStep: this.state.currentStep
      //     });
      //   }
      //   else {

      //     this.setState({
      //       error: isValidated.error
      //     });
      //   }
      // }
      // else {
      this.state.currentStep++;
      this.setState({
        ...this.state,
        currentStep: this.state.currentStep
      });
    }
  }

  checkFields() {
    let isValid = false;
    for (var field in this.refs) {
      if (this.refs.hasOwnProperty(field)) {
        let currField = this.refs[field];
        let validators = currField.dataset.validators;

        if (validator.isEmpty(currField.value)) {
          return {
            isValid: false,
            error: `${currField.name} is empty`
          };
        } else {
          return {
            isValid: true,
            error: null
          };
        }
      }
    }
    return {
      isValid: false,
      error: null
    };
  }

  handleToggleRecipeForm() {
    this.props.handleToggleRecipeForm();
    this.setState({
      ...this.state,
      currentStep: 0
    });
  }

  handleAddNewRecipe(e) {
    e.preventDefault();
    let newRecipe = this.state.newRecipe;
    // this.props.updateRecipes(this.props.userRecipes);
    httpClient.newRecipe(this.state.newRecipe).then(response => {
      this.setState({
        isActive: false || this.props.isActive,
        newRecipe: {
          name: '',
          imageUrl: '',
          cookingTime: {
            hours: '',
            minutes: '',
            seconds: ''
          },
          servingSize: '',
          description: '',
          ingredients: [],
          instructions: []
        },
        currIng: '',
        currQty: '',
        currInt: '',
        currentStep: 0,
        currentFields: [],
        error: null
      });
      if (response) {
        this.props.addNewRecipe(response.data.newRecipe);
        this.props.handleToggleRecipeForm();
      }
    });
  }

  handleAddIngredient() {
    let { currIng, currQty } = this.state;
    let { recipeIngredient } = this.refs;
    let newIngredient = {
      name: currIng,
      quantity: currQty
    };

    this.state.newRecipe.ingredients.push(newIngredient);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {
      ingredients: this.state.newRecipe.ingredients
    });
    this.setState({
      newRecipe: this.state.newRecipe,
      currIng: '',
      currQty: ''
    });

    recipeIngredient.focus();
  }

  handleAddInstruction() {
    let { currInt } = this.state;
    let { recipeInstruction } = this.refs;
    let newInstruction = {
      name: currInt
    };

    this.state.newRecipe.instructions.push(newInstruction);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {
      instructions: this.state.newRecipe.instructions
    });
    this.setState({
      newRecipe: this.state.newRecipe,
      currInt: ''
    });

    recipeInstruction.focus();
  }

  saveFieldsToState() {
    const {
      recipeName,
      recipeImage,
      recipeCookTime,
      recipeServing,
      recipeDescription
    } = this.refs;

    let newRecipeName = !validator.isEmpty(recipeName.value)
      ? validator.trim(recipeName.value)
      : null;
    let newRecipeImage =
      !validator.isEmpty(recipeImage.value) &&
      validator.isURL(recipeImage.value)
        ? validator.trim(recipeImage.value)
        : null;
    let newRecipeCookTime =
      !validator.isEmpty(recipeCookTime.value) &&
      validator.isNumeric(recipeCookTime.value)
        ? validator.trim(recipeCookTime.value)
        : null;
    let newRecipeServing =
      !validator.isEmpty(recipeServing.value) &&
      validator.isNumeric(recipeServing.value)
        ? validator.trim(recipeServing.value)
        : null;
    let newRecipeDescription = !validator.isEmpty(recipeDescription.value)
      ? validator.trim(recipeDescription.value)
      : null;
    
    if (newRecipeName && newRecipeCookTime && newRecipeServing) {
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
    } else {
      this.setState({
        error: 'Please fill out the required fields'
      });
    }
  }
}
