var express = require('express');
var mysql = require('mysql');
var app = express();

// Middleware
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// Includes
var ApiManager = require("./ApiManager.js");

let appState = {
  loggedIn: false,
  currentUser: {},
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
  res.render('index', appState);
});
app.get('/my_recipes', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "MyRecipes"});
  res.render('index', appState);
});
app.get('/create_recipe', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "AddRecipe"});
  res.render('index', appState);
});
app.get('/pantry', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "Pantry"});
  res.render('index', appState);
});
app.get('/create_user', function(req, res) {
  appState = Object.assign({}, appState, {currentPage: "Register"});
  res.render('index', appState);
});



//############
// SERVICES
//############
app.get('/get_users', function(req, res) {
  ApiManager.getUsers(function(data) {
    console.log(data);
    res.send('index', {users: data});
  });
});
app.get('/get_user', function(req, res) {
  ApiManager.getUser(function(data) {
    console.log(data);
    res.send('index', {user: data});
  });
});
// Authentication or registration
app.post('/', upload.array(), function(req, res, next) {
  var userInfo = req.body;
  if(userInfo.action === "login") {
    ApiManager.authUser(userInfo, function(data) {
      if(data === false) {
        res.send(false);
      }
      else {
        appState = Object.assign({}, appState, {currentPage: "Home", loggedIn: true, currentUser: data});
        res.redirect("/");
      }
    });
  }
  else if(userInfo.action === "register") {
    ApiManager.createNewUser(userInfo, function(data) {
        let currentUser = {
          id: data,
          name: userInfo.name,
          profile_picture: userInfo.profile_picture
        };
        appState = Object.assign({}, appState, {currentPage: "Home", loggedIn: true, currentUser});
        // res.render('index', appState);
        res.redirect("/");
    });
  }
});

app.get('/get_recipes', function(req, res) {
  ApiManager.getRecipes(function(data) {
    console.log(data);
    // res.send('index', data);
  });
});
app.get('/get_recipe', function(req, res) {
  ApiManager.getRecipe(function(data) {
    console.log(data);
  });
});


app.post('/add_recipe', upload.array(), function(req, res, next) {

  var recipe_info = req.body;
  // console.log(recipe_info.recipe_name, recipe_info.recipe_image);
  ApiManager.addRecipe(recipe_info, (recipe_id) => {
    res.send(recipe_id);
  });

});
app.post('/add_ingredient', upload.array(), function(req, res, next) {
  var ingredient_info = req.body;
  ApiManager.addIngredient(ingredient_info, (ingredient_id) => {
    res.send(ingredient_id);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Homecooked listening on port 3000!');
});
