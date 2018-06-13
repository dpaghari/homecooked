import React from 'react';


export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    const { recipe_id, ingredients, instructions, recipe_image, name, blurb } = this.props.recipe;
    const { handleToggleRecipeDetail,
            renderIngredientList,
            renderInstructionsList,
            deleteRecipe,
            isActive } = this.props;

    const imgUrl = recipe_image ? recipe_image : './img/placeholder-recipe.jpg';


    if(isActive) {
      const recipeImageStyles = {
        'backgroundImage': `url('${imgUrl}')`
      };
      return (
        <div class="c-recipe-detail l-modal">
          <div class="c-recipe-detail__wrapper">
            <div class="c-recipe-detail__actions">
              <a class="c-recipe-detail__action" href="#" onClick={ deleteRecipe }><i class="fa fa-trash"></i></a>
              <a class="c-recipe-detail__action" href="#" onClick={ handleToggleRecipeDetail }><i class="fa fa-times"></i></a>
            </div>
            <div class="c-recipe-detail__info">
              <div class="c-recipe-detail__left" style={recipeImageStyles}></div>
              <div class="c-recipe-detail__right">
                <h3 class="c-recipe-detail__recipe-name">{name}</h3>
                <p class="c-recipe-detail__blurb">{blurb}</p>
                <h4>
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  Ingredients
                </h4>
                <ul class="c-ingredient-list">

                  { renderIngredientList(ingredients) }
                </ul>
                <h4>
                  <i class="fa fa-list-ol" aria-hidden="true"></i>
                  Instructions
                </h4>
                <ol class="c-instruction-list">

                  { renderInstructionsList(instructions) }
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else return null;
  }

}
