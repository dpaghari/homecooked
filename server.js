var express = require('express');
var mysql = require('mysql');
var app = express();

// Middleware
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// Includes
var ApiManager = require("./ApiManager.js");

const appState = {
  loggedIn: false,
  currentUser: {}
};


app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// App Settings
app.set('view engine', 'jade');
//############
// ROUTING
//############
app.get('/', function(req, res) {
  ApiManager.getUsers(function(data) {
    console.log(data);
  });
  res.render('index', {currentPage: "Home", loggedIn: appState.loggedIn});
});

app.get('/my_recipes', function(req, res) {
  res.render('index', {currentPage: "MyRecipes"});
});
app.get('/create_recipe', function(req, res) {
  res.render('index', {currentPage: "AddRecipe"});
});
app.get('/pantry', function(req, res) {
  res.render('index', {currentPage: "Pantry"});
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
app.post('/auth_user', function(req, res) {
  var userInfo = req.body;
  ApiManager.authUser(function(data) {
    console.log(data);
    res.send('index', {status: data});
  });
});


app.get('/get_recipes', function(req, res) {
  ApiManager.getRecipes(function(data) {
    console.log(data);
    res.send('index', data);
  });
});
app.get('/get_recipe', function(req, res) {
  ApiManager.getRecipe(function(data) {
    console.log(data);
    res.send('index', data);
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
