const axios = require("axios"); // promise based http library
const Homecooked = require("./Homecooked.js");

(function() {
  Homecooked.init((appState)=> {
    let { currentUser, loggedIn, currentPage } = appState.data;
    let recipes = Homecooked.getMyRecipes(currentUser.user_id);  // returns thenable promise with recipes data
    switch(currentPage){
      case "Home":

      if(loggedIn) {
        // Use recipes data to populate meal plan functionality
        recipes.then((response) => {
          Homecooked.getMyMealPlan();
          Homecooked.addRecipesToDOM(response.data, document.querySelector("ul.menu"));
          Homecooked.handleToggleMenu();
          Homecooked.handleAddMealToDay();
          // Homecooked.addRecipesToMealPlan(response.data);
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
      });
      break;
      case "AddRecipe":
      Homecooked.handleCreateRecipe(currentUser.user_id);
      break;
      case "Pantry":
      break;
    }

  });
})();
