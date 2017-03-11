const axios = require("axios");

const shoppingList = (function() {
  let api = {
    getShoppingList
  };

  function getShoppingList(mealplanInfo, user_id) {
    let recipeIds = getRecipeIds(mealplanInfo);
    let data = { recipeIds };

    axios.post("/api/get_user_shoppingList", data).then((response) => {
      let ingredientData = response.data;
      addShoppingListToDOM(recipeIds, ingredientData);
    })
    .catch((err) => {
      console.log("error", err);
    });
  }

  function getRecipeIds(mealplanInfo) {
    let mealplan = JSON.parse(mealplanInfo.mealplan)
    let recipeIds = [];

    mealplan.forEach((weekdayMeals) => {
      weekdayMeals.forEach((meal) => {
        recipeIds.push(parseInt(meal.recipe_id));
      });
    });

    return recipeIds;
  }

  function addShoppingListToDOM(recipeIds, ingredientData) {
    let listDOM = document.querySelector('.shoppingList');
    let shoppingList = '';

    console.log(recipeIds);

    // Convoluted as FUCK
    recipeIds.forEach((id) => {
      ingredientData.forEach((row) => {
        if (row.recipe_id === id) {
          let ingredients = JSON.parse(row.ingredients);

          ingredients.forEach((ingredient) => {
            shoppingList += ingredient.name + " x" + ingredient.quantity + "</br>";
          });
        }
      });
    });

    listDOM.insertAdjacentHTML("beforeend", shoppingList);
  }

  return api;
})();

module.exports = shoppingList;
