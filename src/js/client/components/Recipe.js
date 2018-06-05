import React from 'react';


export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    const { recipe_id, ingredients, instructions, recipe_image, name } = this.props.recipe;
    const { handleToggleRecipeDetail,
            renderIngredientList,
            renderInstructionsList,
            deleteRecipe,
            isActive } = this.props;

    const imgUrl = recipe_image ? recipe_image : './img/cooking.jpeg';

    console.log(this.props.recipe);
    if(isActive) {
      return (
        <div class="c-recipe-detail l-modal">
          <div class="c-recipe-detail__wrapper">
            <div class="c-recipe-detail__actions">
              <button onClick={ deleteRecipe }>Delete</button>
              <button onClick={ handleToggleRecipeDetail }>Close</button>
            </div>
            <div class="c-recipe-detail__info">
              <h3>{name}</h3>
              <img src={imgUrl} alt={name}/>
            </div>
            <ul class="c-ingredient-list">
              { renderIngredientList(ingredients) }
            </ul>
            <ol class="c-instruction-list">
              { renderInstructionsList(instructions) }
            </ol>
          </div>
        </div>
      );
    }
    else return null;
  }

}
