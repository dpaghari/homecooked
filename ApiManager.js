var dbWrapper = require("./db.js");
var ApiManager = (function(dbWrapper) {

  function getUsers(callback) {
    let users;
    let { db } = dbWrapper;
    db.query('SELECT * from `users`', (err, rows, fields) => {
      if(err) throw err;
      users = rows;
      if(typeof callback === "function") {
        callback(users);
      }
    });
  }

  function getUser(user_id, callback) {
    let user;
    let { db } = dbWrapper;
    db.query(`SELECT * from users where id = ${user_id}`, (err, rows, fields) => {
      if(err) throw err;
      if(typeof row !== "undefined" && typeof row[0] !== "undefined"){
        user = row[0];
        callback(user);
      }
    });
  }
  function authUser(user_info, callback) {
    let status;
    let { db } = dbWrapper;
    db.query(`SELECT * from users where username = ${user_info.user_name} and password = ${user_info.password}`, (err, rows, fields) => {
      if(err) throw err;
      if(typeof row !== "undefined" && typeof row[0] !== "undefined"){
        user = row[0];
        callback(user);
      }
      else {
        callback(false);
      }
    });
  }

  function getRecipes(callback) {
    let recipes;
    let { db } = dbWrapper;
    db.query('SELECT * from `recipes`', (err, rows, fields) => {
      if(err) throw err;
      recipes = rows;
      if(typeof callback === "function") {
        callback(recipes);
      }
    });
  }

  function getRecipe(recipe_id, callback) {
    let user;
    let { db } = dbWrapper;
    db.query(`SELECT * from recipes where id = ${recipe_id}`, (err, rows, fields) => {
      if(err) throw err;
      if(typeof row !== "undefined" && typeof row[0] !== "undefined"){
        user = row[0];
        callback(user);
      }
    });
  }

  function addRecipe(recipe_info, callback) {
    let recipes;
    let { db } = dbWrapper;
    db.query('INSERT INTO `recipes` SET ?', {name: recipe_info.name, recipe_image: recipe_info.recipe_image}, function (err, rows, fields) {
      if(err) throw err;
      if(typeof callback === "function") {
        // return last insert id
        callback(rows.insertId);
      }
    });
  }
  function addIngredient(ing_info, callback) {
    let recipes;
    let { db } = dbWrapper;
    db.query('INSERT INTO `ingredients` SET ?', {name: ing_info.name, quantity: ing_info.quantity}, function (err, rows, fields) {
      if(err) throw err;
      if(typeof callback === "function") {
        // return last insert id
        callback(rows.insertId);
      }
    });
  }

  return {
    getUsers,
    getUser,
    authUser,
    getRecipes,
    getRecipe,
    addRecipe,
    addIngredient
  };
})(dbWrapper);



module.exports = ApiManager;
