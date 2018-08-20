import React from 'react';
import httpClient from '../../httpClient.js';

export default class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false || this.props.editIsActive,
      editRecipe: {
        user: '',
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
      }
    };
  }

  render() {
    const {
      _id,
      ingredients,
      instructions,
      imageUrl,
      name,
      description
    } = this.props.recipe;
    const {
      handleToggleRecipeDetail,
      renderIngredientList,
      renderInstructionsList,
      deleteRecipe,
      editForm,
      isActive
    } = this.props;

    const imgUrl = imageUrl ? imageUrl : './img/placeholder-recipe.jpg';

    if (isActive) {
      const recipeImageStyles = {
        backgroundImage: `url('${imgUrl}')`
      };
      return (
        <div class="c-recipe-detail l-modal">
          <div class="c-recipe-detail__wrapper">
            <div class="c-recipe-detail__actions">
              <a
                class="c-recipe-detail__action"
                href="#"
                onClick={editForm}
                onMouseOver={this.handleStateLoadUp.bind(this)}
              >
                <i class="fa fa-edit" />
              </a>
              <a
                class="c-recipe-detail__action"
                href="#"
                onClick={() => deleteRecipe(_id)}
              >
                <i class="fa fa-trash" />
              </a>
              <a
                class="c-recipe-detail__action"
                href="#"
                onClick={handleToggleRecipeDetail}
              >
                <i class="fa fa-times" />
              </a>
            </div>
            <div class="c-recipe-detail__info">
              <div class="c-recipe-detail__left">
                <img class="c-recipe-detail__image" src={imgUrl} alt={name} />
              </div>
              <div class="c-recipe-detail__right">
                {this.props.editIsActive ? (
                  <div>
                    <input
                      onChange={this.onInputChange.bind(this)}
                      data-name="name"
                      name="name"
                      type="text"
                      defaultValue={name}
                    />
                    <input
                      onChange={this.onInputChange.bind(this)}
                      data-name="description"
                      name="description"
                      type="text"
                      defaultValue={description}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 class="c-recipe-detail__recipe-name">
                      {this.state.editRecipe.name}
                    </h3>
                    <p class="c-recipe-detail__blurb">
                      {this.state.editRecipe.description}
                    </p>
                  </div>
                )}
                <h4>
                  <i class="fa fa-shopping-cart" aria-hidden="true" />
                  Ingredients
                </h4>
                <ul class="c-ingredient-list">
                  {this.props.editIsActive
                    ? ingredients.map((ingredient, idx) => {
                        return (
                          <li key={idx} class="c-ingredients">
                            <input
                              onChange={this.onInputChange.bind(this)}
                              data-id={idx}
                              name="quantity"
                              type="text"
                              defaultValue={ingredient.quantity}
                            />
                            <input
                              onChange={this.onInputChange.bind(this)}
                              data-id={idx}
                              name="name"
                              type="text"
                              defaultValue={ingredient.name}
                            />
                          </li>
                        );
                      })
                    : renderIngredientList(ingredients)}
                </ul>
                <h4>
                  <i class="fa fa-list-ol" aria-hidden="true" />
                  Instructions
                </h4>
                <ol class="c-instruction-list">
                  {this.props.editIsActive
                    ? instructions.map((step, idx) => {
                        return (
                          <li key={idx} class="c-instruction">
                            <input
                              onChange={this.onInputChange.bind(this)}
                              data-id={idx}
                              name="instruction"
                              type="text"
                              defaultValue={step.name}
                            />
                          </li>
                        );
                      })
                    : renderInstructionsList(instructions)}
                </ol>
                {this.props.editIsActive ? (
                  <button onClick={() => this.handleSave(_id)}> save </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }

  onInputChange(evt) {
    if (
      evt.target.dataset.name === 'name' ||
      evt.target.dataset.name === 'description'
    ) {
      this.setState({
        editRecipe: {
          ...this.state.editRecipe,
          [evt.target.name]: evt.target.value
        }
      });
    } else if (evt.target.name === 'name' || evt.target.name === 'quantity') {
      this.setState({
        editRecipe: {
          ...this.state.editRecipe,
          ingredients: this.updateIngredient(
            evt,
            this.state.editRecipe.ingredients
          )
        }
      });
    } else if (evt.target.name === 'instruction') {
      this.setState({
        editRecipe: {
          ...this.state.editRecipe,
          instructions: this.updateInstruction(
            evt,
            this.state.editRecipe.instructions
          )
        }
      });
    }
  }

  updateIngredient(evt, ingredients) {
    return ingredients.map(ingredient => {
      if (ingredients.indexOf(ingredient) === parseInt(evt.target.dataset.id)) {
        return Object.assign(ingredient, {
          [evt.target.name]: evt.target.value
        });
      } else {
        return ingredient;
      }
    });
  }

  updateInstruction(evt, instructions) {
    return instructions.map(instruction => {
      if (
        instructions.indexOf(instruction) === parseInt(evt.target.dataset.id)
      ) {
        return Object.assign(instruction, { name: evt.target.value });
      } else {
        return instruction;
      }
    });
  }

  handleSave(id) {
    httpClient.updateRecipe(id, this.state.editRecipe).then(response => {
      this.props.editForm();
    });
  }

  handleStateLoadUp() {
    this.setState({
      edit: false || this.props.editIsActive,
      editRecipe: {
        user: this.props.recipe.user,
        name: this.props.recipe.name,
        imageUrl: this.props.recipe.imageUrl,
        cookingTime: {
          hours: this.props.recipe.cookingTime.hours,
          minutes: this.props.recipe.cookingTime.minutes,
          seconds: this.props.recipe.cookingTime.seconds
        },
        servingSize: this.props.recipe.servingSize,
        description: this.props.recipe.description,
        ingredients: this.props.recipe.ingredients,
        instructions: this.props.recipe.instructions
      }
    });
  }
}
