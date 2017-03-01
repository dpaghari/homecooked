var dbWrapper = require("./db.js");
var ApiManager = (function(dbWrapper) {

  function getUsers(callback) {
    let users;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {

      connection.query('SELECT * from `users`', (error, rows, fields) => {
        if(error) throw error;
        users = rows;
        connection.release();
        if(typeof callback === "function") {
          callback(users);
        }

      });
    });

  }

  function getUser(user_id, callback) {
    let user;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {

      connection.query("SELECT * from users where `id` = ?", [user_id], (err, rows, fields) => {
        if(err) throw err;
        if(typeof rows !== "undefined" && typeof rows[0] !== "undefined"){
          user = rows[0];
          connection.release();
          callback(user);
        }
      });
    });


  }
  function authUser(user_info, callback) {
    let status;
    let { db } = dbWrapper;
    // let queryString = "SELECT name, password FROM users WHERE name = ? AND password = ?";
    let { user_name, password } = user_info;
    db.getConnection(function(err, connection) {
    connection.query("SELECT * FROM `users` WHERE `name` = ? AND `password` = ?", [user_name, password], (err, rows, fields) => {
      if(err) throw err;

      if(typeof rows !== "undefined" && typeof rows[0] !== "undefined"){
        user = {
          id: rows[0].id,
          name: rows[0].name,
          profile_picture: rows[0].profile_picture
        };
        connection.release();
        callback(user);
      }
      else {
        connection.release();
        callback(false);
      }
    });
  });

  }

  function createNewUser(new_user_info, callback) {
    let { db } = dbWrapper;
    let { name, password, profile_picture } = new_user_info;
    db.getConnection(function(err, connection) {
      connection.query('INSERT INTO `users` SET ?', {name, password, profile_picture}, function (err, rows, fields) {
        if(err) throw err;
        if(typeof callback === "function") {
          let id = rows.insertId;
          connection.release();
          // return last insert id
          callback(id);
        }
      });
    });

  }

  function getRecipes(callback) {
    let recipes;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query('SELECT * from `recipes`', (err, rows, fields) => {
        if(err) throw err;
        recipes = rows;
        connection.release();
        if(typeof callback === "function") {
          callback(recipes);
        }
      });
    });

  }
  function getRecipe(recipe_id, callback) {
    let user;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query("SELECT * from `recipes` where `id` = ?", [recipe_id], (err, rows, fields) => {
        if(err) throw err;
        if(typeof row !== "undefined" && typeof row[0] !== "undefined"){
          user = row[0];
          connection.release();
          callback(user);
        }
      });
    });

  }

  function getUserRecipes(userInfo, callback) {
    let recipes = [];
    let { user_id } = userInfo;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query('SELECT * from `recipes` where `owner_id` = ?', [user_id], (err, rows, fields) => {
        if(err) throw err;
        recipes = rows;
        connection.release();
        if(typeof callback === "function") {
          callback(recipes);
        }
      });
    });
  }
  function getUserMealPlan(userInfo, callback) {
    let mealplan = [];
    let { user_id } = userInfo;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query('SELECT * from `mealplans` where `owner_id` = ?', [user_id], (err, rows, fields) => {
        if(err) throw err;
        mealplan = rows;
        connection.release();
        if(typeof callback === "function") {
          callback(mealplan);
        }
      });
    });
  }

  function addRecipe(recipe_info, callback) {
    let { db } = dbWrapper;
    let { owner_id, name, cooking_time, serving_size, recipe_image, ingredients, directions, blurb } = recipe_info;
    ingredients = JSON.stringify(ingredients);
    directions = JSON.stringify(directions);
    db.getConnection(function(err, connection) {
      connection.query('INSERT INTO `recipes` SET ?', {owner_id, name, cooking_time, serving_size, recipe_image, ingredients, instructions: directions, blurb}, function (err, rows, fields) {
        if(err) throw err;
        if(typeof callback === "function") {
          let id = rows.insertId;
          connection.release();
          // return last insert id
          callback(id);
        }
      });
    });

  }
  function addIngredient(ing_info, callback) {
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query('INSERT INTO `ingredients` SET ?', {name: ing_info.name, quantity: ing_info.quantity}, function (err, rows, fields) {
        if(err) throw err;
        if(typeof callback === "function") {
          let id = rows.insertId;
          connection.release();
          // return last insert id
          callback(rows.insertId);
        }
      });
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
    getUserMealPlan,
    addRecipe,
    addIngredient
  };
})(dbWrapper);



module.exports = ApiManager;
