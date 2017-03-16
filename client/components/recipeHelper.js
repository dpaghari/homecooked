const axios = require("axios");

const recipeHelper = (function() {

  let api = {
    getMyRecipes,
    addRecipesToDOM,
    getMiniRecipeHTML
  };

  function getMyRecipes(user_id) {
    let data = {
      user_id
    };
    return axios.post("/api/get_user_recipes", data);
  }

  function addRecipesToDOM(recipes, target) {

    let recipeList = target || document.querySelector(".recipeList");
    let recipeListStr = "";
    recipes.forEach((el, idx) => {
      let {
        recipe_id,
        name,
        cooking_time,
        ingredients,
        instructions,
        blurb,
        recipe_image,
        serving_size } = el;

      let formatted_ingredients = JSON.parse(ingredients);
      let formatted_directions = JSON.parse(instructions);
      let ing_string = "", dir_string = "";

      if(formatted_ingredients !== null){
        formatted_ingredients.forEach((el, idx) => {
          let new_list_item = `<li class="ingredient">${el.name} ${el.quantity} ${el.measure}</li>`;
          ing_string = ing_string.concat(new_list_item);
        });
      }
      if(formatted_directions !== null) {
        formatted_directions.forEach((el, idx) => {
          let new_list_item = `<li class="step">${el.step}</li>`;
          dir_string = dir_string.concat(new_list_item);
        });
      }


      let recipeEntryHTML = `
      <li data-recipe_id=${recipe_id} class="recipe">
        <div class="recipe-header">
          <div class="left">
            <h2 class="recipeName">${name}</h2>
            <div class="recipe-info">
              <p class="recipeServing">
              <i class="fa fa-users"></i>
              ${serving_size}
              <p class="cookingTime">
              <i class="fa fa-clock-o"></i>
              ${cooking_time}
              </p>
              <p class="blurb"> ${blurb}</p>
            </div>
          </div>
          <div class="right">
            <ul class="recipeCtrls">
              <li class="recipeCtrl editRecipe"><i class="fa fa-pencil-square-o"></i></li>
              <li class="recipeCtrl delRecipe"><i class="fa fa-trash"></i></li>
              <li class="recipeCtrl shareRecipe"><i class="fa fa-share"></i></li>
            </ul>
            <img class="recipeImg" src=${recipe_image} alt="recipe image"/>
          </div>
        </div>
        <div class="recipe-body">
        <ul class="ingredients">${ing_string}</ul>
        <ol class="directions">${dir_string}</ol>
        </div>
      </li>
      `;
      recipeList.insertAdjacentHTML('beforeend', recipeEntryHTML);
    });
  }

  function getMiniRecipeHTML(recipeInfo) {
    let { recipe_id, name, recipe_image } = recipeInfo;

    let miniRecipe = `
      <div data-recipe_id=${recipe_id} class="recipe-mini">
        <img src="${recipe_image}" alt="${recipe_image}">
        <div class="overlay">
          <h4>${name}</h4>
          <div class="cta">
            <i class="fa fa-check"></i>
            <i class="fa fa-times"></i>
          </div>
        </div>
      </div>
    `;
    return miniRecipe;
  }

  return api;
})();

module.exports = recipeHelper;
