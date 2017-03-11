var dbWrapper = require("./db.js");
var ApiManager = (function(dbWrapper) {

  function getUsers(callback) {
    let users;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {

      connection.query('SELECT `name`, `profile_picture`, `signup_date` from `users`', (error, rows, fields) => {
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

      connection.query("SELECT `name`, `profile_picture`, `signup_date` from `users` where `user_id` = ?", [user_id], (err, rows, fields) => {
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
    let { db } = dbWrapper;
    // let queryString = "SELECT name, password FROM users WHERE name = ? AND password = ?";
    let { user_name, password } = user_info;
    db.getConnection(function(err, connection) {
    connection.query("SELECT `user_id`, `name`, `profile_picture` FROM `users` WHERE `name` = ? AND `password` = ?", [user_name, password], (err, rows, fields) => {
      if(err) throw err;

      if(typeof rows !== "undefined" && typeof rows[0] !== "undefined"){
        let user = rows[0];
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
  function getRecipe(recipeInfo, callback) {
    let { recipe_id } = recipeInfo;
    let { db } = dbWrapper;
    db.getConnection(function(err, connection) {
      connection.query("SELECT * from `recipes` where `recipe_id` = ?", [recipe_id], (err, rows, fields) => {
        if(err) throw err;

        if(typeof rows !== "undefined" && typeof rows[0] !== "undefined"){
          user = rows[0];
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
      connection.query('SELECT * from `recipes` where `user_id` = ?', [user_id], (err, rows, fields) => {
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
      connection.query('SELECT * from `mealplans` where `user_id` = ?', [user_id], (err, rows, fields) => {
        if(err) throw err;
        if(rows && rows[0]){
          mealplan = rows[0];
          connection.release();
          if(typeof callback === "function") {
            callback(mealplan);
          }
        }
      });
    });
  }

  function addRecipe(recipe_info, callback) {
    let { db } = dbWrapper;
    let { user_id, name, cooking_time, serving_size, recipe_image, ingredients, directions, blurb } = recipe_info;
    ingredients = JSON.stringify(ingredients);
    directions = JSON.stringify(directions);
    db.getConnection(function(err, connection) {
      connection.query('INSERT INTO `recipes` SET ?', {user_id, name, cooking_time, serving_size, recipe_image, ingredients, instructions: directions, blurb}, function (err, rows, fields) {
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
          callback(id);
        }
      });
    });

  }

  function saveUserMealPlan(mealPlanInfo, callback) {
    let { db, mysql } = dbWrapper;
    let { mealPlan, user_id } = mealPlanInfo;
    db.getConnection(function(err, connection) {
      connection.query("INSERT INTO `mealplans` (`user_id`,`mealplan`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `user_id` = ? , `mealplan` = ?",[user_id, mealPlan, user_id, mealPlan] ,function(err, rows, fields) {
        if(err) throw err;
        if(typeof callback === "function") {
          let id = rows.insertId;
          connection.release();
          callback(id);
        }
      });
    });

  }

  function getUserShoppingList(mealPlanInfo, callback) {
    let { db, mysql } = dbWrapper;
    let { recipeIds } = mealPlanInfo;
    let query = `SELECT recipe_id, ingredients
                 FROM recipes 
                 WHERE recipe_id IN (${recipeIds}) 
                 AND ingredients IS NOT NULL`;

    db.query(query, recipeIds, function(err, rows) {
      if (err) throw err;

      if (typeof callback === "function") {
        callback(rows);
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
    getUserMealPlan,
    addRecipe,
    addIngredient,
    saveUserMealPlan,
    getUserShoppingList
  };
})(dbWrapper);



module.exports = ApiManager;
