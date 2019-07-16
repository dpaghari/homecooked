import React from 'react';
import axios from 'axios';
import validator from 'validator';
import httpClient from '../../httpClient.js';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false || this.props.isActive,
      headline: "What\'s on the menu?",
      newRecipe: {
        user: {},
        name: '',
        imageUrl: '',
        cookingTime: {
          hours: '',
          minutes: ''
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

  componentDidMount() {
    const HEADER_COPY = [
      "What\'s cookin good lookin?",
      "What\'s on the menu?",
      "Easy does it, Chef Boyardee",
      "Do you even cook, bro?",
    ];

    const randomHeaderIdx = Math.abs(Math.floor(Math.random() * HEADER_COPY.length - 1));

    this.setState({
      headline: HEADER_COPY[randomHeaderIdx],
      newRecipe: {
        ...this.state.newRecipe,
        user: this.props.currentUser
      }
    });
  }


  onInputChange(evt) {
    if (
      evt.target.name === 'hours' ||
      evt.target.name === 'minutes'
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

  onInputChange(evt) {
    const { tags } = this.state;
    if (evt.target.name === 'hours' || evt.target.name === 'minutes') {
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
      evt.target.name === 'currInt' ||
      evt.target.name === 'currTag'
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

  renderTags() {
    const { tags } = this.state.newRecipe;
    return tags.map((tag, idx) => {
      return <li key={idx}>{tag.name}</li>;
    });
  }

  renderCurrFieldSet() {
    const {
      currentStep,
      error,
      currIng,
      currQty,
      currInt,
      currTag,
      headline
    } = this.state;
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
          <h4 class="c-new-recipe__heading">{headline}</h4>
          <h3 class="c-new-recipe__subheading">Let's add a new recipe</h3>
          <label for="recipeName">Recipe Name</label>
          <input
            name="name"
            type="text"
            ref="recipeName"
            placeholder="e.g Shrimp Scampi"
            required
            data-validators="isEmpty,trim"
            value={name}
          />
          <label for="recipeImage">Recipe Image URL</label>
          <input
            name="imageUrl"
            type="text"
            ref="recipeImage"
            placeholder="e.g http://free-images.com/shrimp-scampi.jpg"
            required
            data-validators="isEmpty,trim"
            value={imageUrl}
          />
          <label for="recipeCookTime">Cooking Time</label>
          <div class="c-new-recipe__cook-time">
            <label for="hours">Hours</label>
            <input
              name="hours"
              type="number"
              ref="recipeCookTime"
              placeholder="e.g 2"
              required
              data-validators="isEmpty,trim"
              value={cookingTime.hours}
            />
            <label for="minutes">Minutes</label>
            <input
              name="minutes"
              type="number"
              ref="recipeCookTime"
              placeholder="e.g 45"
              required
              data-validators="isEmpty,trim"
              max="60"
              value={cookingTime.minutes}
            />
          </div>
          <label for="recipeServing">Serves how many?</label>
          <input
            name="servingSize"
            type="number"
            ref="recipeServing"
            placeholder="2"
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
            placeholder="One of my holiday go-tos"
            required
            data-validators="isEmpty,trim"
            value={description}
          />
          <a
            href="#"
            onMouseDown={() => this.handleValidator(this.state.newRecipe)}
            onClick={this.handleClickNext.bind(this)}
            class="c-new-recipe__next"
          >Next
            <i class="fas fa-arrow-right" />
          </a>
        </fieldset>
      );
    } else if (currentStep === 1) {
      return (
        <fieldset class="c-new-recipe__step--two">
          <h4 class="c-new-recipe__heading">Ingredients</h4>
          <div class="c-new-recipe__field">
            <label for="recipeIngredient">Ingredient Name</label>
            <input
              name="currIng"
              type="text"
              ref="recipeIngredient"
              placeholder="Ingredient"
              value={currIng}
            />
          </div>
          <div class="c-new-recipe__field">
            <label for="recipeIngQty">Ingredient Quantity</label>
            <input
              name="currQty"
              type="text"
              ref="recipeIngQty"
              placeholder="Qty"
              value={currQty}
            />
          </div>
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
          >Next
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
            class="c-new-recipe__submit c-new-recipe__next"
          >Finish
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
    if (currentStep < 2 && this.state.error === null) {
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
      newRecipe: {
        user: this.props.currentUser,
        name: '',
        imageUrl: '',
        cookingTime: {
          hours: '',
          minutes: '',
        },
        servingSize: '',
        description: '',
        ingredients: [],
        instructions: [],
        tags: []
      },
      currentStep: 0,
      error: null
    });
  }

  handleAddNewRecipe(e) {
    e.preventDefault();
    let newRecipe = this.state.newRecipe;
    httpClient.newRecipe(this.state.newRecipe).then(response => {
      this.setState({
        isActive: false || this.props.isActive,
        newRecipe: {
          user: this.props.currentUser,
          name: '',
          imageUrl: '',
          cookingTime: {
            hours: '',
            minutes: ''
          },
          servingSize: '',
          description: '',
          ingredients: [],
          instructions: [],
          tags: []
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

  handleAddTag() {
    let { currTag } = this.state;
    let { foodTag } = this.refs;
    let newTag = {
      name: currTag
    };

    this.state.newRecipe.tags.push(newTag);
    this.state.newRecipe = Object.assign({}, this.state.newRecipe, {
      tags: this.state.newRecipe.tags
    });
    this.setState({
      newRecipe: this.state.newRecipe,
      currTag: ''
    });

    foodTag.focus();
  }

  handleValidator(object) {
    let isValid = false;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] === '' || !validator.isURL(object['imageUrl'])) {
          return this.setState({
            error: `All Fields Required`
          });
        } else if (property === 'cookingTime') {
          for (var prop in object[property]) {
            if (object[property][prop] === '') {
              return this.handleValidator(object[prop]);
            }
          }
        } else {
          isValid = true;
        }
      }
    }
    if (isValid) {
      this.setState({
        error: null
      });
    }
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
