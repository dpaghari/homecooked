const path = require('path');

const express = require('express');
const app = express();
const mongoose = require('mongoose'); //mongodb
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/homecooked';
require('dotenv').load();

// Middleware
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const logger = require('morgan');
var session = require('express-session')


// Includes
// const ApiManager = require("./ApiManager.js");
const usersRoutes = require('./Routes/users.js');
const recipeRoutes = require('./Routes/recipes.js');

const initialState = {};

let appState = initialState;

var sess = {
  secret: 'asuhdude',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

// App Settings
app.use(express.static(path.join(__dirname + './../public')));
app.set('view engine', 'pug');
app.set('views',  './server/views');
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//############
// ROUTING
//############

app.use('/api/users', usersRoutes);
app.use('/api/recipe', recipeRoutes);

app.get('*', function(req, res) {
  res.render('index');
});

//connects to mongodb
mongoose.connect(
  MONGODB_URI,
  err => {
    console.log(err || `Connected to MongoDB.`);
  }
);

app.listen(process.env.PORT || 3000, function() {
  console.log('Homecooked listening on port 3000!');
});
