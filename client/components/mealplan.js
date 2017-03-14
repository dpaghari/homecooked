const axios = require("axios");
const RecipeHelper = require("./recipeHelper.js");
const ShoppingList = require("./shoppingList.js");

const MealPlan = (function() {

  let api = {
    getMyMealPlan,
    saveMealPlan,
    clearMealPlan
  };

  function getMyMealPlan(user_id) {
    let data = {
      user_id
    };
    axios.post("/api/get_user_mealplan", data).then((response) => {
      console.log(response);
      let mealplanInfo = response.data;
      addMealPlanToDOM(mealplanInfo);
      ShoppingList.getShoppingList(mealplanInfo, user_id);
    })
    .catch((err) => {
      console.log("error", err);
    });

  }

  function addMealPlanToDOM(mealplanInfo) {
    let { mealplan } = mealplanInfo;
    let weekdayPlans = [].slice.call(document.querySelectorAll("li.weekday .plan"), 0);

    mealplan = JSON.parse(mealplan);

    mealplan.forEach((weekdayMeals,idx) => {
      if(weekdayMeals.length > 0) {
        let mealSlots = weekdayPlans[idx].children;
        weekdayMeals.forEach((meal, idx) => {
          let { recipe_id, mealPosition } = meal;
          recipe_id = parseInt(recipe_id);
          addMealToDay(recipe_id, mealSlots[mealPosition]);
        });
      }
    });
  }

  // Adds meal to previously clicked placeholder
  // @param recipe_id number / string
  // @param target element
  function addMealToDay(recipe_id, target) {
    // Make sure it's to a number
    recipe_id = parseInt(recipe_id);
    let data = {
      recipe_id
    };
    if(target.outerHTML) {
      // fetch recipe information based on id
      axios.post("/api/get_recipe", data).then((response) => {
        let miniRecipe = RecipeHelper.getMiniRecipeHTML(response.data);
        target.outerHTML = miniRecipe;
        // saveMealPlan();
      });
    }
  }

  function saveMealPlan() {
    let mealPlan = [];
    let weekdayPlans = [].slice.call(document.querySelectorAll("li.weekday .plan"), 0);
    weekdayPlans.forEach((elem, idx) => {
      var newWeekdayPlan = createWeekdayEntry(elem);
      mealPlan.push(newWeekdayPlan);
    });
    mealPlan = JSON.stringify(mealPlan);
    axios.post("/api/save_meal_plan", {
      mealPlan
    }).then((response) => {
      // console.log(response.data);
    })
    .catch((err) => {
      console.log("error", err);
    });
  }

  function clearMealPlan() {
    let weekdayPlans = [].slice.call(document.querySelectorAll("li.weekday .plan"), 0);
    let placeHolderHTML = `
    <div class="placeholder">
      <i class="fa fa-plus"></i>
    </div>
    `;
    weekdayPlans.forEach((elem, idx) => {
      var meals = [].slice.call(elem.children);

      meals.forEach((meal, i) => {
        if(meal.classList.contains("recipe-mini")) {
          meal.outerHTML = placeHolderHTML;
        }
      });
    });
  }

  function createWeekdayEntry(weekday) {
    let newWeekday = [];

    let meals = [].slice.call(weekday.children);
    meals.forEach((el, idx) => {
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

  return api;

})();

module.exports = MealPlan;
