var express = require('express');
var mysql = require('mysql');
var app = express();

// Middleware
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// Includes
var ApiManager = require("./ApiManager.js");

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// App Settings
app.set('view engine', 'jade');
//############
// ROUTING
//############
app.get('/', function(req, res) {
  // ApiManager.getUsers(function(data) {
  //   console.log(data);
  // });
  res.render('index', {currentPage: "Home"});
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
    res.render('index', data);
  });
});


app.get('/get_recipes', function(req, res) {
  ApiManager.getRecipes(function(data) {
    console.log(data);
    res.render('index', data);
  });
});


app.post('/add_recipe', upload.array(), function(req, res, next) {

  var recipe_info = req.body;
  // console.log(recipe_info.recipe_name, recipe_info.recipe_image);
  ApiManager.addRecipe((recipe_info) => {
    res.send("");
  });

});
app.post('/add_ingredient', upload.array(), function(req, res, next) {

  var ingredient_info = req.body;
  // console.log(recipe_info.recipe_name, recipe_info.recipe_image);
  connection.connect();
  // var sql = `INSERT INTO recipes (name, recipe_image) VALUES (${recipe_info.recipe_name}, ${recipe_info.recipe_image})`;
  connection.query('INSERT INTO ingredients SET ?', {name: ingredient_info.name, quantity: ingredient_info.quantity}, function (err, rows, fields) {
  if (err) throw err;
  res.json(rows.insertId);
  });
  connection.end();

});

app.listen(3000, function() {
  console.log('Homecooked listening on port 3000!');
});
