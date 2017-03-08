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

  function saveMealPlan() {
    let mealPlan = [];
    let weekdayPlans = [].slice.call(document.querySelectorAll("li.weekday .plan"), 0);
    weekdayPlans.forEach((elem, idx) => {
      var newWeekdayPlan = createWeekdayEntry(elem);
      mealPlan.push(newWeekdayPlan);
    });
    console.log(mealPlan);
    mealPlan = JSON.stringify(mealPlan);
    axios.post("/api/save_meal_plan", {
      mealPlan
    }).then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log("error", err);
    });


  }


  function createWeekdayEntry(weekday) {
    let newWeekday = [];
    weekday = [].slice.call(weekday.children);
    weekday.forEach((el, idx) => {
      if(el.dataset.recipe_id) {
        let { recipe_id } = el.dataset;
        let meal = {
          recipe_id,
          mealPosition: idx
        };
        newWeekday.push(meal);
      }
    });
    return newWeekday;
  }

  return {
    addRecipesToMealPlan,
    getMyMealPlan,
    addMealPlanToDOM,
    saveMealPlan
  };

})();

module.exports = MealPlan;
