const axios = require("axios");
const Homecooked = require("./Homecooked.js");

(function() {
  Homecooked.init((appState)=> {
    let { currentUser, loggedIn, currentPage } = appState.data;
    switch(currentPage){
      case "Home":
      Homecooked.handleLogin();
      Homecooked.handleRegister();
      break;
      case "MyRecipes":
      Homecooked.getMyRecipes(currentUser.id);
      break;
      case "AddRecipe":
      Homecooked.handleCreateRecipe(currentUser.id);
      break;
      case "Pantry":
      break;
    }

  });
})();
