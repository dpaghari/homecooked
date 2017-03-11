const express = require('express');
const mysql = require('mysql');
const app = express();

// Middleware
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

// Includes
const ApiManager = require("./ApiManager.js");

let appState = {
  loggedIn: true,
  currentUser: {
    name: "Daniel",
    user_id: 15,
    profile_picture: "sup"
  },
  currentPage: "Home"
};

// App Settings
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'jade');


//############
// ROUTING
//############
app.get('/', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "Home"});
  //console.log(appState);
  res.render('index', appState);
});
app.get('/my_recipes', function(req, res) {
  // ApiManager.getUserRecipes(appState.currentUser.id, function(recipes) {
  //   console.log(appState);
  // });
  appState = Object.assign({}, appState, {currentPage: "MyRecipes"});
  //console.log(appState);
  res.render('index', appState);


});
app.get('/create_recipe', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "AddRecipe"});
  //console.log(appState);
  res.render('index', appState);
});
app.get('/pantry', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "Pantry"});
  // console.log(appState);
  res.render('index', appState);
});

//############
// SERVICES
//############
// Get All user info
app.get('/api/get_users', function(req, res) {
  ApiManager.getUsers(function(data) {
    res.send('index', {users: data});
  });
});

// Get Single User Info
app.get('/api/get_user', function(req, res) {
  ApiManager.getUser(function(data) {
    res.send('index', {user: data});
  });
});
// Authentication or registration
app.post('/', upload.array(), function(req, res, next) {
  let userInfo = req.body;
  //console.log(userInfo);

  if(userInfo.action === "login") {
    var response;
    ApiManager.authUser(userInfo, function(data) {
      if(data === false) {
        appState = Object.assign({}, appState, {error: "Username or password is incorrect"});
        response = {
          appState,
          redirect: "/"
        };
        res.json(response);
      }
      else {
        appState = Object.assign({}, appState, {currentPage: "Home", loggedIn: true, currentUser: data, error: undefined});
        response = {
          appState,
          redirect: "/"
        };
        res.json(response);
      }
    });
  }
  else if(userInfo.action === "register") {
    ApiManager.createNewUser(userInfo, function(data) {
        let currentUser = {
          user_id: data,
          name: userInfo.name,
          profile_picture: userInfo.profile_picture
        };
        appState = Object.assign({}, appState, {currentPage: "Home", loggedIn: true, currentUser});
        var response = {
          appState,
          redirect: "/"
        };
        res.json(response);
    });
  }
});

app.get('/api/get_recipes', function(req, res) {
  ApiManager.getRecipes(function(data) {
    // res.send('index', data);
  });
});

app.post('/api/get_user_recipes', upload.array(), function(req, res, next) {
  var userInfo = req.body;
  ApiManager.getUserRecipes(userInfo, function(data) {
    //console.log(data);
    res.json(data);
  });
});
app.post('/api/get_user_mealplan', upload.array(), function(req, res, next) {
  var userInfo = req.body;
  ApiManager.getUserMealPlan(userInfo, function(data) {
    //console.log(data);
    res.json(data);
  });
});


app.get('/get_app_state', function(req, res) {
  res.json(appState);
});
app.post('/api/get_recipe', upload.array(), function(req, res, next) {
  var recipeInfo = req.body;
  //console.log(recipeInfo);
  ApiManager.getRecipe(recipeInfo, function(data) {
    //console.log("recipe_info: ", data);
    res.json(data);
  });
});


app.post('/api/add_recipe', upload.array(), function(req, res, next) {

  var recipe_info = req.body;
  // console.log(recipe_info.recipe_name, recipe_info.recipe_image);
  ApiManager.addRecipe(recipe_info, (recipe_id) => {
    var response = {
      recipe_id,
      appState,
      redirect: "/my_recipes"
    };
    res.json(response);
    // res.send(recipe_id);
  });

});
app.post('/api/add_ingredient', upload.array(), function(req, res, next) {
  var ingredient_info = req.body;
  ApiManager.addIngredient(ingredient_info, (ingredient_id) => {
    res.send(ingredient_id);
  });
});
app.post('/api/save_meal_plan', upload.array(), function(req, res, next) {
  var mealPlanInfo = req.body;
  mealPlanInfo.user_id = appState.currentUser.user_id;
  ApiManager.saveUserMealPlan(mealPlanInfo, (mealplan_id) => {
    res.json(mealplan_id);
  });
});

app.post('/api/get_user_shoppingList', upload.array(), function (req, res) {
  var recipeIds = req.body;
  ApiManager.getUserShoppingList(recipeIds, (ingredients) => {
    res.json(ingredients);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Homecooked listening on port 3000!');
});
