var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded


app.set('view engine', 'jade');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: 'root',
  database : 'homecooked'
});

app.get('/', function(req, res) {
  connection.connect();

  connection.query('SELECT * from `users`', function(err, rows, fields) {
    if(err) throw err;
    console.log(rows[0]);
    res.render('index', rows[0]);
  });

  connection.end();


});


app.get('/recipes/1', function(req, res) {
  connection.connect();
  connection.query('SELECT * from `recipes`', function(err, rows, fields) {
    if(err) throw err;
    console.log(rows[0]);
    res.render('recipes', rows[0]);
  });
  connection.end();
});

app.get('/create_recipe', function(req, res) {
  // connection.connect();
  // connection.query();
  // connection.end();
  res.render('create_recipe');
});

app.post('/add_recipe', upload.array(), function(req, res, next) {

  var recipe_info = req.body;
  // console.log(recipe_info.recipe_name, recipe_info.recipe_image);
  connection.connect();
  // var sql = `INSERT INTO recipes (name, recipe_image) VALUES (${recipe_info.recipe_name}, ${recipe_info.recipe_image})`;
  connection.query('INSERT INTO recipes SET ?', {name: recipe_info.recipe_name, recipe_image: recipe_info.recipe_image}, function (err, rows, fields) {
  if (err) throw err;
  res.json(rows.insertId);
  });
  connection.end();

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
