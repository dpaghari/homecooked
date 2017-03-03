"use strict";
const axios = require("axios");


const MealPlan = (function() {
  function addRecipesToMealPlan(recipes) {
    console.log(recipes);
  }


  function getMyMealPlan(user_id) {
    let data = {
      user_id
    };
    axios.post("/api/get_user_mealplan", data).then((response) => {
      let mealplan = response.data;
      console.log(mealplan);
      addMealPlanToDOM(mealplan);
    })
    .catch((err) => {
      console.log("error", err);
    });

  }

  function addMealPlanToDOM(mealplan) {

  }

  return {
    addRecipesToMealPlan,
    getMyMealPlan,
    addMealPlanToDOM
  };

})();

module.exports = MealPlan;
