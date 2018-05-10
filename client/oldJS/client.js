const axios = require("axios"); // promise based http library
const Homecooked = require("./Homecooked.js");

(function() {
  Homecooked.init((appState)=> {
    console.log("Appstate", appState);
    let { currentUser, loggedIn, currentPage } = appState.data;

    let recipes = Homecooked.getMyRecipes(currentUser.user_id);  // returns thenable promise with recipes data
    switch(currentPage){
      case "Home":

      if(loggedIn) {
        // Use recipes data to populate meal plan functionality
        recipes.then((response) => {
          Homecooked.getMyMealPlan(currentUser.user_id);
          Homecooked.addRecipesToDOM(response.data, document.querySelector("ul.menu"));
          Homecooked.handleShowMenu();
          Homecooked.handleHideMenu();
          Homecooked.handleAddMealToDay();
          Homecooked.handleCtrlBtns();
          // Homecooked.handleShowShoppingList();
          Homecooked.handleHideShoppingList();
        });
      }
      else {
        Homecooked.handleLogin();
        Homecooked.handleRegister();
      }

      break;
      case "MyRecipes":
      // Use recipes data to populate user's recipes list
      recipes.then((response) => {
        Homecooked.addRecipesToDOM(response.data);
        Homecooked.handleDeleteRecipe();
        Homecooked.handleShowRecipeForm();
        Homecooked.handleCreateRecipe(currentUser.user_id);
      });
      break;
      case "AddRecipe":
      break;
      case "Pantry":
      break;
    }

  });
})();
