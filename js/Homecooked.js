const axios = require("axios");
const validator = require("validator");
const Homecooked = (function() {

  function init(callback) {
    axios.get("/get_app_state").then((res)=> {
      callback(res);
    });
  }

  function getMyRecipes(user_id) {
    let data = {
      user_id
    };
    axios.post("/get_user_recipes", data).then((response) => {
      let recipes = response.data;
      console.log(recipes);
      addRecipesToDOM(recipes);
    })
    .catch((err) => {
      console.log("error", err);
    });
  }


  function addRecipesToDOM(recipes) {
    console.log(recipes);
    let recipeList = document.querySelector(".recipeList");
    let recipeListStr = "";
    recipes.forEach((el, idx) => {
      let {
        name,
        cooking_time,
        ingredients,
        instructions,
        blurb,
        recipe_image,
        serving_size } = el;
        console.log(el);

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
      <li class="recipe">
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
            </div>
          </div>
          <img class="recipeImg" src=${recipe_image} alt="recipe image"/>
        </div>
        <div class="recipe-body">
        <p class="blurb"> ${blurb}</p>
        <ul class="ingredients">${ing_string}</ul>
        <ol class="directions">${dir_string}</ol>
        </div>
      </li>
      `;
      recipeList.insertAdjacentHTML('beforeend', recipeEntryHTML);
    });


  }



  function handleAddToMealPlan() {

  }


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
      {field: recipeName, required: true},
      {field: recipeImage, required: true},
      {field: ingredientName, required: false},
      {field: stepInput, required: false},
      {field: cookTime, required: true},
      {field: cookTimeMeasure, required: true},
      {field: quantity, required: false},
      {field: blurb, required: false}
    ];

    let ingredients = []; // hold ingredient objects { name, quantity }
    let directions = [];  // hold directions objects { step }


    let invalidInputs = [];


    // Ingredient Handler
    addIngredientForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let ingredient = ingredientName.value;

      if(!validator.isEmpty(quantity.value) && validator.isNumeric(quantity.value) && !validator.isEmpty(ingredient) && !validator.isEmpty(measure.value)){
        let newIngredient = {
          name: ingredient,
          quantity: quantity.value,
          measure: measure.value
        };
        let newIngHTML = `
          <li class="newIngredient"><span>${newIngredient.name}</span><span>${newIngredient.quantity}</span><span>${newIngredient.measure}</span></li>
        `;
        document.querySelector(".recipePrep ul.ingredientsList").insertAdjacentHTML("beforeend", newIngHTML);
        ingredients.push(newIngredient);
      }
    });
    // Directions Handler
    addDirectionsForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let step = stepInput.value;

      if(!validator.isEmpty(step)){
        let newDirection = {
          step
        };
        let newDirHTML = `
          <li class="newIngredient"><span>${newDirection.step}</span></li>
        `;
        document.querySelector(".recipePrep ol.directionsList").insertAdjacentHTML("beforeend", newDirHTML);
        directions.push(newDirection);
      }
    });



    // Form submission handler
    addRecipeBtn.addEventListener("click", function(e) {
      e.preventDefault();

      invalidInputs = fields.filter((el, idx) => {
        let valid = false;
        let { field, required } =  el;
        if(required)
          if(validator.isEmpty(field.value)) return el;

        if(field.name === "cookTime")
          if(!validator.isNumeric(field.value) && validator.isEmpty(field.value) && validator.contains(field.value, " ")) return el;

      });

      console.log(invalidInputs);

      // let invalidInputs = required_fields.filter(function(el,idx){
      //   if(el.name === "recipe_name")
      //     return validator.isEmpty(el.value);
      //   else if(el.name === "recipe_image");
      //     return validator.isEmpty(el.value) || validator.contains(el.value, " ");
      // });




      if(invalidInputs.length < 1) {
        console.log(user_id);
        let data = {
          owner_id : user_id,
          name: recipeName.value,
          cooking_time: cookTime.value + cookTimeMeasure.value,
          serving_size: servingSize.value,
          recipe_image: recipeImage.value,
          ingredients,
          directions,
          blurb: blurb.value
        };

        axios.post("/add_recipe", data).then((response) => {

          let { redirect } = response.data;
          console.log("response", response.data);
          window.location.href = redirect;
        })
        .catch((err) => {
          console.log("error", err);
        });
      }
    });
  }


  function addIngredientToList(ingredient) {

  }



  function handleAddIngredient() {

  }

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

  return {
    init,
    getMyRecipes,
    addRecipesToDOM,
    handleAddToMealPlan,
    handleCreateRecipe,
    handleAddIngredient,
    handleLogin,
    handleRegister
  };
})();

module.exports = Homecooked;
