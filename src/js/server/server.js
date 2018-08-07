const path = require('path');


const express = require('express');
const mysql = require('mysql');
const app = express();
const mongoose = require('mongoose') //mongodb
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/homecooked'

// Middleware
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const logger = require('morgan')

// Includes
const ApiManager = require("./ApiManager.js");

const initialState = {
  loggedIn: true,
  currentUser: {
    name: "Daniel",
    user_id: 2,
    profile_picture: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/31131270_10214106691836126_6397608758125527040_n.jpg?_nc_cat=0&oh=aed28f41fa138de102820680eb3d9a8a&oe=5B957335"
  }
};

let appState = initialState;

// App Settings
app.use(express.static('public'));
app.use(logger('dev'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//############
// ROUTING
//############

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '../../../public/index.html', function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

//############
// SERVICES
//############
// Get All user info
app.get('/api/get_users', function(req, res) {
  ApiManager.getUsers(function(data) {
    res.json({users: data});
  });
});

// Get Single User Info
app.get('/api/get_user', function(req, res) {
  ApiManager.getUser(function(data) {
    res.json({user: data});
  });
});
// Authentication or registration
app.post('/', upload.array(), function(req, res, next) {
  let userInfo = req.body;
  console.log(userInfo);

  if(userInfo.action === "login") {
    var response;
    ApiManager.authUser(userInfo, function(data) {
      console.log(data);
      if(data === false) {
        appState = Object.assign({}, initialState, {error: "Username or password is incorrect"});
        response = {
          appState,
          redirect: "/"
        };
        res.json(response);
      }
      else {
        appState = Object.assign({}, initialState, {currentPage: "Home", loggedIn: true, currentUser: data, error: undefined});
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
        appState = Object.assign({}, initialState, {currentPage: "Home", loggedIn: true, currentUser});
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
    res.json(data);
  });
});

app.post('/api/get_user_recipes', upload.array(), function(req, res, next) {
  var userInfo = req.body;
  ApiManager.getUserRecipes(userInfo, function(data) {
    //console.log(data);
    res.json(data);
  });
});
app.post('/api/get_global_recipes', upload.array(), function(req, res, next) {
  var userInfo = req.body;
  ApiManager.getGlobalRecipes(userInfo, function(data) {
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


app.post('/api/add_follower_to_recipe', upload.array(), function(req, res, next) {
  var recipe_info = req.body;

  ApiManager.addFollowerIdToRecipe(recipe_info, (recipe_id) => {
    var response = {
      recipe_id,
      appState
    };
    res.json(response);
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

app.post('/api/get_user_shopping_list', upload.array(), function (req, res) {
  var recipeIds = req.body;
  ApiManager.getUserShoppingList(recipeIds, (ingredients) => {
    res.json(ingredients);
  });
});

app.post('/api/delete_recipe', upload.array(), function(req, res) {
  let payload = req.body;
  let response = false;
  ApiManager.deleteRecipe(payload, function (result) {
    response = result;

    res.json(response);
  });


});

//connects to mongodb 
mongoose.connect(MONGODB_URI, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.listen(process.env.PORT || 3001, function() {
  console.log('Homecooked listening on port 3000!');
});


