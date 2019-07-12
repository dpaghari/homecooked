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
        },
        servingSize: '',
        description: '',
        ingredients: [],
        instructions: []
      }
    };
  }

  componentDidUpdate() {
  }

  renderDeleteBtn() {
    if (this.props.deleteRecipe && typeof(this.props.deleteRecipe) === "function") {
      return (
        <a
          class="c-recipe-detail__action"
          href="#"
          onClick={() => this.props.deleteRecipe(this.props.recipe._id)}
        >
          <i class="fa fa-trash" />
        </a>
      );
    } else {
      return null;
    }
  }
  renderEditBtn() {
    if (this.props.editForm && typeof(this.props.editForm) === "function") {
      return (
        <a
          class="c-recipe-detail__action"
          href="#"
          onClick={this.props.editForm}
        >
          <i class="fa fa-edit" />
        </a>
      );
    } else {
      return null;
    }
  }
  renderAddBtn() {
    return (
      <a
        class="c-recipe-detail__action"
        href="#"
        onClick={this.handleAddToCookbook.bind(this, this.props.recipeIdx)}
      >
        <i class="fa fa-plus" />
      </a>
    );
  }

  render() {
    const {
      handleToggleRecipeDetail,
      renderIngredientList,
      renderInstructionsList,
      isActive
    } = this.props;
    if (isActive) {
      const {
        _id,
        ingredients,
        instructions,
        imageUrl,
        name,
        description
      } = this.props.recipe;
      const imgUrl = imageUrl ? imageUrl : './img/placeholder-recipe.jpg';
      const recipeImageStyles = {
        backgroundImage: `url('${imgUrl}')`
      };
      return (
        <div class="c-recipe-detail l-modal">
          <div class="c-recipe-detail__wrapper">
            <div class="c-recipe-detail__actions">
              { this.renderEditBtn() }
              { this.renderDeleteBtn() }
              { this.renderAddBtn() }
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
                    <h3 class="c-recipe-detail__recipe-name">{name}</h3>
                    <p class="c-recipe-detail__blurb">{description}</p>
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

  handleAddToCookbook(idx) {
    let newExploreRecipe = this.props.globalRecipes[idx];
    let user = this.props.currentUser;

    let copiedRecipeWithCurrUser = {
      ...newExploreRecipe,
      user,
      _id: undefined
    };
    httpClient.newRecipe(copiedRecipeWithCurrUser).then((response) => {
    }).catch((err) => console.log(err));
  }
}
