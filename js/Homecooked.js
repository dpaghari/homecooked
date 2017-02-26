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
        recipe_image,
        serving_size } = el;
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
        <p class="blurb"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </li>
      `;
      recipeList.insertAdjacentHTML('beforeend', recipeEntryHTML);
    });


  }



  function handleAddToMealPlan() {

  }


  function handleCreateRecipe(user_id) {
    // addRecipeForm
    let recipeForm = document.querySelector("form[name=addRecipeForm]");
    // Inputs
    let recipeName = document.querySelector("form[name=addRecipeForm] input[name=recipe_name]");
    let recipeImage = document.querySelector("form[name=addRecipeForm] input[name=recipe_image]");
    let servingSize = document.querySelector("form[name=addRecipeForm] input[name=recipe_servsize]");
    let cookTime = document.querySelector("form[name=addRecipeForm] input[name=recipe_cooktime]");
    let cookTimeMeasure = document.querySelector("form[name=addRecipeForm] select.cooktime_measure");

    let ingredientName = document.querySelector("form[name=addRecipeForm] input[name=ingredient]");
    let quantity = document.querySelector("form[name=addRecipeForm] input[name=qty]");

    let step = document.querySelector("form[name=addRecipeForm] input[name=step]");

    let fields = [
      {field: recipeName, required: true},
      {field: recipeImage, required: true},
      {field: ingredientName, required: false},
      {field: step, required: false},
      {field: cookTime, required: false},
      {field: cookTimeMeasure, required: false},
      {field: quantity, required: false}
    ];

    let ingredients = []; // hold ingredient objects { name, quantity }
    let directions = [];  // hold directions objects { step }


    let invalidInputs = [];

    recipeForm.addEventListener("submit", function(e) {
      e.preventDefault();

      invalidInputs = fields.filter((el, idx) => {
        let valid = false;
        let { field, required } =  el;
        if(required)
          if(validator.isEmpty(field.value)) return el;

        if(field.name === "ingredient") {
          console.log(field.value);
        }

        if(field.name === "step") {
          console.log(field.value);
        }

        if(field.name === "qty" || field.name === "cookTime")
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
          directions
        };
        console.log(data);
        axios.post("/add_recipe", data).then((response) => {
          console.log("let's do it!");
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
