import React from 'react';

export default class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false || this.props.editIsActive,
      editRecipe: {
        user: '',
        name:'' ,
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
      currVal:'',
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
                {this.props.editIsActive
                ?(
                  <div>
                  <input name='name' type='text' value={name}></input>
                  <input name='description' type='text' value={description}></input>
                  </div>
                )
                :(
                  <div>
                  <h3 class="c-recipe-detail__recipe-name">{name}</h3>
                  <p class="c-recipe-detail__blurb">{description}</p>
                  </div>
                )
                }
                <h4>
                  <i class="fa fa-shopping-cart" aria-hidden="true" />
                  Ingredients
                </h4>
                <ul class="c-ingredient-list">
                  {this.props.editIsActive
                  ?(
                    ingredients.map((ingredient, idx) => {
                      return (
                        <li key={idx} class="c-ingredients">
                          <input onChange={this.onInputChange.bind(this)} data-id={idx} name='quantity' type='text' defaultValue={ingredient.quantity}></input>
                          <input onChange={this.onInputChange.bind(this)} data-id={idx} name='name' type='text' defaultValue={ingredient.name}></input>
                        </li>
                      );
                    })
                  )
                  :(
                    renderIngredientList(ingredients)
                  )
                  }
                </ul>
                <h4>
                  <i class="fa fa-list-ol" aria-hidden="true" />
                  Instructions
                </h4>
                <ol class="c-instruction-list">
                  {this.props.editIsActive
                    ?(
                        instructions.map((step, idx) => {
                          return (
                            <li key={idx} class="c-instruction">
                              <input name={idx} type='text' value={step.name}></input>
                            </li>
                          );
                        })
                      )
                    :(
                        renderInstructionsList(instructions)
                    )
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }

  onInputChange(evt) {
    if(evt.target.name === 'name' || evt.target.name === 'quantity'){
     this.setState({
        ...this.state.editRecipe,
        ingredients:this.updateIngredient(evt,this.state.editRecipe.ingredients)
    })
    console.log(this.state.editRecipe.ingredients)
  }
}

  updateIngredient(evt,ingredients){
    return ingredients.map(ingredient => {
      if (ingredients.indexOf(ingredient) === parseInt(evt.target.dataset.id)) {
         return Object.assign(ingredient, { [evt.target.name]:evt.target.value })
      }
    })
  }

  handleStateLoadUp(){
    this.setState({
      edit: false || this.props.editIsActive,
      editRecipe: {
        user: this.props.recipe.user,
        name:this.props.recipe.name ,
        imageUrl: this.props.recipe.imageUrl,
        cookingTime: {
          hours: this.props.recipe.cookingTime.hours,
          minutes: this.props.recipe.cookingTime.minutes,
          seconds: this.props.recipe.cookingTime.seconds
        },
        servingSize: this.props.recipe.servingSize,
        description: this.props.recipe.descripion,
        ingredients: this.props.recipe.ingredients,
        instructions: this.props.recipe.instructions
      },
    })
  }
}
