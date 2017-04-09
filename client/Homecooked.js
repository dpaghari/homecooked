const axios = require("axios");
const validator = require("validator");
const MealPlan = require("./components/mealplan.js");
const RecipeHelper = require("./components/recipeHelper.js");

const Homecooked = (function() {

  let api = {
    init,
    addMealToDay,
    showRecipeMenu,
    hideRecipeMenu,
    handleShowMenu,
    handleHideMenu,
    handleAddMealToDay,
    handleCreateRecipe,
    handleLogin,
    handleRegister,
    handleCtrlBtns,
    handleShowShoppingList,
    handleShowRecipeForm,

    // Mealplan
    saveMealPlan: MealPlan.saveMealPlan,
    addRecipesToMealPlan: MealPlan.addRecipesToMealPlan,
    getMyMealPlan: MealPlan.getMyMealPlan,
    addMealPlanToDOM: MealPlan.addMealPlanToDOM,
    // RecipeHelper
    getMyRecipes: RecipeHelper.getMyRecipes,
    addRecipesToDOM: RecipeHelper.addRecipesToDOM,
    getMiniRecipeHTML: RecipeHelper.getMiniRecipeHTML,
    handleDeleteRecipe: RecipeHelper.handleDeleteRecipe
  };

  // Used to store placeholdler element
  var clickedEmptyMeal;

  // Get Initial App State from server
  function init(callback) {
    axios.get("/get_app_state").then((response) => {
      callback(response);
    });
  }

  function handleShowShoppingList() {
    let shoppingListBtn = document.querySelector('.shopping-list');
    shoppingListBtn.addEventListener('click', function() {
      // console.log('ay lmao');
      document.querySelector('ul.shoppingList').style.display = 'block';
      document.querySelector('.lightbox').style.display = 'block';
      document.querySelector('.lightbox').style.opacity = 1;
    });
  }


  // Attaches Handler when user clicks on a recipe slot in the meal plan; placeholder
  function handleShowMenu() {
    let placeholders = document.querySelectorAll(".placeholder");
    placeholders.forEach((el, idx) => {
      el.addEventListener("click", showRecipeMenu);
    });
  }

  function handleHideMenu() {
    let closeMenu = document.querySelector("a.closeMenu");
    if(closeMenu) {
      closeMenu.addEventListener("click", function(e) {
        e.preventDefault();
        hideRecipeMenu();
        document.querySelector('ul.shoppingList').style.display = 'none';
        document.querySelector('.lightbox').style.display = 'none';
        document.querySelector('.lightbox').style.opacity = 0;
      });
    }
  }

  // Attaches Handler when user clicks a recipe item on the sidebar menu
  function handleAddMealToDay() {
    let recipes = document.querySelectorAll("ul.menu li.recipe");
    recipes.forEach((el,idx) => {
      el.addEventListener("click", function(e) {
        e.preventDefault();
        let { recipe_id } = this.dataset;
        addMealToDay(recipe_id, clickedEmptyMeal);
        hideRecipeMenu();
      });
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
        MealPlan.saveMealPlan();
      });
    }
  }



  // Shows sidebar menu
  function showRecipeMenu(e) {
    e.preventDefault();
    clickedEmptyMeal = this;
    let recipeMenu = document.querySelector(".recipeMenu");
    let lightbox = document.querySelector(".lightbox");
    if(!recipeMenu.classList.contains("active")){
      recipeMenu.classList.add("active");
      lightbox.style.display = "block";
      lightbox.style.opacity = 1;

    }
  }

  // Hides sidebar menu
  function hideRecipeMenu() {
    clickedEmptyMeal = null;
    let recipeMenu = document.querySelector(".recipeMenu");
    let lightbox = document.querySelector(".lightbox");
    if(recipeMenu.classList.contains("active")){
      recipeMenu.classList.remove("active");
      lightbox.style.opacity = 0;
      lightbox.style.display = "none";
    }
  }

  // Attaches handlers to input elements in the create recipe page form
  function handleCreateRecipe(user_id) {
    // Forms
    let addIngredientForm = document.querySelector(".addRecipeForm form.addIngredientForm");
    let addDirectionsForm = document.querySelector(".addRecipeForm form.addDirectionsForm");
    let addRecipeBtn = document.querySelector(".addRecipeForm button.addRecipe");

    // Inputs
    let recipeName = document.querySelector(".addRecipeForm input[name=recipe_name]");
    let recipeImage = document.querySelector(".addRecipeForm input[name=recipe_image]");
    let servingSize = document.querySelector(".addRecipeForm input[name=recipe_servsize]");
    let cookTime = document.querySelector(".addRecipeForm input[name=recipe_cooktime]");
    let cookTimeMeasure = document.querySelector(".addRecipeForm select.cooktime_measure");
    let blurb = document.querySelector(".addRecipeForm textarea[name=blurb]");
    let ingredientName = document.querySelector(".addRecipeForm input[name=ingredient]");
    let quantity = document.querySelector(".addRecipeForm input[name=qty]");
    let measure = document.querySelector(".addRecipeForm input[name=measure]");
    let stepInput = document.querySelector(".addRecipeForm input[name=step]");

    let fields = [
      { field: recipeName, required: true },
      { field: recipeImage, required: true },
      { field: ingredientName, required: false },
      { field: stepInput, required: false },
      { field: cookTime, required: true },
      { field: cookTimeMeasure, required: true },
      { field: quantity, required: false },
      { field: blurb, required: false }
    ];

    let ingredients = []; // hold ingredient objects { name, quantity }
    let directions = [];  // hold directions objects { step }


    let invalidInputs = [];


    // Ingredient Handler
    if(addIngredientForm) {
      addIngredientForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let ingredient = ingredientName.value;

        if(!validator.isEmpty(quantity.value) &&
           (validator.isNumeric(quantity.value) || validator.isDecimal(quantity.value)) &&
           !validator.isEmpty(ingredient) &&
           !validator.isEmpty(measure.value)){
          let newIngredient = {
            name: ingredient,
            quantity: quantity.value,
            measure: measure.value
          };
          let newIngHTML = `
          <li class="newIngredient">
          <span class="ing_name">${newIngredient.name}</span>
          <span class="ing_qty">${newIngredient.quantity}</span>
          <span class="ing_mea">${newIngredient.measure}</span>
          </li>
          `;
          document.querySelector(".recipePrep ul.ingredientsList").insertAdjacentHTML("beforeend", newIngHTML);
          ingredients.push(newIngredient);
          ingredientName.value = "";
          quantity.value = "";
          measure.value = "";
          ingredientName.focus();
        }
      });
    }
    // Directions Handler
    if(addDirectionsForm) {
      addDirectionsForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let step = stepInput.value;

        if(!validator.isEmpty(step)){
          let newDirection = {
            step
          };
          let newDirHTML = `
          <li class="newStep"><span>${newDirection.step}</span></li>
          `;
          document.querySelector(".recipePrep ol.directionsList").insertAdjacentHTML("beforeend", newDirHTML);
          directions.push(newDirection);
          stepInput.value = "";
          stepInput.focus();
        }
      });
    }



    // Form submission handler
    if(addRecipeBtn) {
      addRecipeBtn.addEventListener("click", function(e) {
        e.preventDefault();

        invalidInputs = fields.filter((el) => {
          let valid = false;
          let { field, required } =  el;
          if(required)
          if(validator.isEmpty(field.value)) return el;

          if(field.name === "cookTime")
          if(!validator.isNumeric(field.value) && validator.isEmpty(field.value) && validator.contains(field.value, " ")) return el;

        });

        if(invalidInputs.length < 1) {
          let data = {
            user_id,
            name: recipeName.value,
            cooking_time: cookTime.value + cookTimeMeasure.value,
            serving_size: servingSize.value,
            recipe_image: recipeImage.value,
            ingredients,
            directions,
            blurb: blurb.value
          };

          axios.post("/api/add_recipe", data).then((response) => {

            let { redirect } = response.data;

            window.location.href = redirect;
          })
          .catch((err) => {
            console.log("error", err);
          });
        }
      });
    }
  }


  // Attaches handler for login form at homepage
  function handleLogin() {
    var loginForm = document.querySelector("form.loginForm");
    if(loginForm) {
      loginForm.addEventListener("submit", function(e) {

        e.preventDefault();
        let user_name = document.querySelector("form.loginForm input[name=user_name]").value;
        let password = document.querySelector("form.loginForm .l_pwd").value;

        if(!validator.isEmpty(user_name) && !validator.contains(user_name," ") && !validator.isEmpty(password)){

          let data = {
            action: "login",
            user_name,
            password
          };
          axios.post("/", data).then((response) => {

            let { redirect } = response.data;
            window.location.href = redirect;
          })
          .catch((err) => {
            console.log("error", err);
          });



        }

      });
    }
  }


  // Attaches handler for login form at homepage
  function handleRegister(){
    // Triggers the registration form
    var registerBtn = document.querySelector("form.loginForm .registerBtn");
    if(registerBtn) {
      registerBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var forms = document.querySelectorAll("form.registerForm, form.loginForm");
        forms.forEach(function(el, idx) {
          el.classList.toggle("active");
        });
      });
    }
    // Completes the registration
    var registerForm = document.querySelector("form.registerForm");
    if(registerForm) {
      registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var registerFormInputs = [].slice.call(document.querySelectorAll("form.registerForm input[type=text], form.registerForm input[type='password']"), 0);
        var userName = document.querySelector("input.r_un").value;
        var pwd = document.querySelector("input.r_pwd").value;
        var confirmPW = document.querySelector("input[name=confirm_password]").value;
        var profile_picture = document.querySelector("input.r_profile_pic").value;

        var invalidInputs = registerFormInputs.filter(function(el, idx) {
          return validator.isEmpty(el.value) || validator.contains(el.value, " ");
        });
        if(invalidInputs.length < 1 && pwd === confirmPW) {
          var data = {
            action: "register",
            name: userName,
            password: pwd,
            profile_picture : profile_picture
          };
          axios.post("/", data).then((response) => {
            let { redirect } = response.data;
            window.location.href = redirect;
          })
          .catch((err) => {
            console.log("error", err);
          });
        }
      });
    }
  }

  function handleCtrlBtns() {
    var clearBtn = document.querySelector(".ctrl-btn.delete-plan");
    var finishBtn = document.querySelector(".ctrl-btn.complete-plan");
    var cartBtn = document.querySelector(".ctrl-btn.shopping-list");
    if(clearBtn) {
      clearBtn.addEventListener("click", function (e) {
        e.preventDefault();
        MealPlan.clearMealPlan();
        MealPlan.saveMealPlan();
      });
    }
    if(finishBtn) {
      finishBtn.addEventListener("click", function (e) {
        e.preventDefault();
        MealPlan.clearMealPlan();
        MealPlan.saveMealPlan();
        // Add method here for reducing pantry ingredients from all recipes in the mealplan
      });
    }
    if(cartBtn) {
      cartBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Logic for showing shopping list
      });
    }
  }

  function handleShowRecipeForm() {
    document.querySelector('button.showRecipeForm').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.addRecipeWrapper').classList.add('active');
    });
  }

  return api;
})();

module.exports = Homecooked;
