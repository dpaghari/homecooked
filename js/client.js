const axios = require("axios");
const Homecooked = require("./Homecooked.js");

(function() {
  Homecooked.init((appState)=> {
    let { currentUser, loggedIn, currentPage } = appState.data;
    let recipes = Homecooked.getMyRecipes(currentUser.id);
    switch(currentPage){
      case "Home":
      recipes.then((response) => {
        Homecooked.getMyMealPlan();
        Homecooked.addRecipesToMealPlan(response.data);
      });
      Homecooked.handleLogin();
      Homecooked.handleRegister();
      break;
      case "MyRecipes":
      recipes.then((response) => {
        Homecooked.addRecipesToDOM(response.data);
      });
      break;
      case "AddRecipe":
      Homecooked.handleCreateRecipe(currentUser.id);
      break;
      case "Pantry":
      break;
    }

  });
})();
