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
    db.query("SELECT * from users where `id` = ?", [user_id], (err, rows, fields) => {
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
    // let queryString = "SELECT name, password FROM users WHERE name = ? AND password = ?";
    let { user_name, password } = user_info;
    db.query("SELECT * FROM `users` WHERE `name` = ? AND `password` = ?", [user_name, password], (err, rows, fields) => {
      if(err) throw err;

      if(typeof rows !== "undefined" && typeof rows[0] !== "undefined"){
        user = {
          id: rows[0].id,
          name: rows[0].name,
          profile_picture: rows[0].profile_picture
        };
        callback(user);
      }
      else {
        callback(false);
      }
    });
  }

  function createNewUser(new_user_info, callback) {
    let { db } = dbWrapper;
    let { name, password, profile_picture } = new_user_info;
    db.query('INSERT INTO `users` SET ?', {name, password, profile_picture}, function (err, rows, fields) {
      if(err) throw err;
      if(typeof callback === "function") {
        // return last insert id
        callback(rows.insertId);
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
    db.query("SELECT * from `recipes` where `id` = ?", [recipe_id], (err, rows, fields) => {
      if(err) throw err;
      if(typeof row !== "undefined" && typeof row[0] !== "undefined"){
        user = row[0];
        callback(user);
      }
    });
  }

  function getUserRecipes(userInfo, callback) {
    let recipes = [];
    let { user_id } = userInfo;
    let { db } = dbWrapper;
    db.query('SELECT * from `recipes` where `owner_id` = ?', [user_id], (err, rows, fields) => {
      if(err) throw err;
      recipes = rows;
      if(typeof callback === "function") {
        callback(recipes);
      }
    });
  }

  function addRecipe(recipe_info, callback) {
    let { db } = dbWrapper;
    let { name, recipe_image, owner_id } = recipe_info;
    db.query('INSERT INTO `recipes` SET ?', {name, recipe_image, owner_id}, function (err, rows, fields) {
      if(err) throw err;
      if(typeof callback === "function") {
        // return last insert id
        callback(rows.insertId);
      }
    });
  }
  function addIngredient(ing_info, callback) {
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
    createNewUser,
    getRecipes,
    getRecipe,
    getUserRecipes,
    addRecipe,
    addIngredient
  };
})(dbWrapper);



module.exports = ApiManager;
