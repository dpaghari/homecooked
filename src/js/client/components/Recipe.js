import React from 'react';


export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    const { recipe_id, ingredients, instructions } = this.props.recipe;
    const { handleToggleRecipeDetail,
            renderIngredientList,
            renderInstructionsList,
            deleteRecipe,
            isActive } = this.props;
            
    console.log(isActive);
    if(isActive) {
      return (
        <div class="c-recipe-detail l-modal">
          <div class="c-recipe-detail__wrapper">
            <div class="c-user-recipes__actions">
              <button onClick={ deleteRecipe }>Delete</button>
              <button onClick={ handleToggleRecipeDetail }>Close</button>
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
