// var $$ = document.querySelector;

(function() {
  var currState = {
    loggedIn: false,
    currentUser: {}
  };




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


  var newRecipeNameInput = document.querySelector("input[name='recipe_name']");
  var newRecipeNamePreview = document.querySelector(".recipeName");

  // window.addEventListener("scroll", function(e) {
  //   console.log(this.scrollY);
  // });

  if(newRecipeNameInput){
    newRecipeNameInput.addEventListener("blur", function(e) {
      newRecipeNamePreview.textContent = this.value;
    });
  }
  var recipeImageInput = document.querySelector("input[name='recipe_image']");
  if(recipeImageInput) {
    recipeImageInput.addEventListener("blur", function(e) {
      document.querySelector(".recipeImg").src = this.value;
    });
  }

  var addIngredientBtn = document.querySelector(".addIngredient");
  if(addIngredientBtn) {
    addIngredientBtn.addEventListener("click", function(e){
      e.preventDefault();
      var sent = sendIngredientData();
      sent.then(function(res) {
        console.log(res);
        addIngredientToDom(res);
      });
    });
  }

  var addRecipeBtn = document.querySelector(".addRecipe");
  if(addRecipeBtn) {
    addRecipeBtn.addEventListener("click", function(e) {
      e.preventDefault();
      var sent = sendRecipeData();
      sent.then(function(res) {
        console.log(res);
        addRecipeToDom(res);
      });
      // window.location = "/";
    });
  }

  function sendIngredientData() {
    var ingredientInput = document.querySelector("input[name='ingredient']");
    var ingredientQty = document.querySelector("input[name='qty']");
    var ingredientName = ingredientInput.value;
    var quantityAmount = ingredientQty.value;
    var data = {
      name: ingredientName,
      quantity : quantityAmount
    };
    var p = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/add_ingredient");
      xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
          var info = Object.assign({}, data, {id: xhr.responseText});
          resolve(info);
        }
      };
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });
    return p;
  }


  function sendRecipeData() {
    var inputVals = [].slice.call(document.querySelectorAll("input[type='text']"), 0);
    var data = processData(inputVals);
    var p = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/add_recipe");
      xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          var info = Object.assign({}, data, {id: xhr.responseText});
          resolve(info);
        }
      };
      console.log(data);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });
    return p;
  }


  function checkLogin(credentials) {
    var success;
    credentials = JSON.stringify(credentials);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth_user");
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        success = xhr.responseText;
        return success;
      }
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(credentials);
  }

  function processData(inputs){
    let data = {};
    inputs.forEach(function(el, idx) {
      switch(el.name){
        case "recipe_name":
        data.recipe_name = el.value;
        break;
        case "recipe_image":
        data.recipe_image = el.value;
        break;
      }
    });
    return data;
  }

  function addRecipeToDom(recipe) {
    console.log(recipe);
    var preview = document.querySelector(".preview");

    var newEntry = "<div><p>"+ recipe.recipe_name +"</p><img src='"+ recipe.recipe_image+"'/></div>";
    document.querySelector("form").insertAdjacentHTML("afterend", newEntry);
  }
  function addIngredientToDom(ingredient) {
    console.log(ingredient);
    var newEntry = "<li><span>"+ ingredient.name +"</span><span>"+ ingredient.quantity+"</span></li>";
    document.querySelector(".ingredients").insertAdjacentHTML("beforeend", newEntry);
  }



})();
