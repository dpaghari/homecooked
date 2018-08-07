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
      if (err) {
        throw err;
      }

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
    let { user_name, password } = user_info;
    db.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query("SELECT `user_id`, `name`, `profile_picture` FROM `users` WHERE `name` = ? AND `password` = ?", [user_name, password], (err, rows, fields) => {

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
        if(err) console.log(err);
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

  function getGlobalRecipes(userInfo, callback) {
    let recipes = [];
    let { user_id } = userInfo;
    let { db } = dbWrapper;

    db.getConnection(function(err, connection) {

      connection.query('SELECT * from `recipes` where `user_id` != ?', [user_id], (err, rows, fields) => {
        if(err) throw err;
        recipes = rows;
        connection.release();
        if(typeof callback === "function") {
          callback(recipes);
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
    let { user_id, name, cooking_time, serving_size, recipe_image, ingredients, instructions, blurb } = recipe_info;
    ingredients = JSON.stringify(ingredients);
    instructions = JSON.stringify(instructions);
    db.getConnection(function(err, connection) {
      connection.query('INSERT INTO `recipes` SET ?', {user_id, name, cooking_time, serving_size, recipe_image, ingredients, instructions, blurb}, function (err, rows, fields) {
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

  function addFollowerIdToRecipe(recipe_info, callback) {
    let { db } = dbWrapper;
    let { recipe_id, follower_id } = recipe_info;
    console.log(recipe_info);

    db.getConnection(function(err, connection) {
      connection.query("SELECT `follower_ids` FROM `recipes` where `recipe_id` = ?", [recipe_id], (err, rows, fields) => {

        if(err) throw err;
        let newFollowerArr = [];
        newFollowerArr.push(follower_id);
        if(rows[0].follower_ids) {
          let existingFollowers = JSON.parse(rows[0].follower_ids);
          existingFollowers.push(follower_id);
          newFollowerArr = existingFollowers;
        }
        newFollowerArr = JSON.stringify(newFollowerArr);
        connection.query("UPDATE recipes SET ? WHERE recipe_id = ?",[{follower_ids: newFollowerArr}, recipe_id], (err, rows, fields) => {
          if(err) throw err;
          if(typeof callback === "function") {
            let id = rows.insertId;
            connection.release();
            callback(id);
          }
        });

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

    db.query(query, function(err, rows) {
      if (err) throw err;

      if (typeof callback === "function") {
        callback(rows);
      }
    });
  }


  function deleteRecipe(payload, callback) {
    let { db, mysql } = dbWrapper;
    let { recipe_id } = payload;
    recipe_id = parseInt(recipe_id);
    console.log(recipe_id);
    let query = "DELETE FROM `recipes` where recipe_id = ?";
    db.query(query, [recipe_id], function(err, rows) {
      if(err) throw err;
      if(typeof callback === 'function')
      callback(true);
    });
  }

  function updateRecipe(recipe_changes) {
    let { db, mysql } = dbWrapper;
    for (var key in recipe_changes) {
      if (recipe_changes.hasOwnProperty(key)) {
        console.log(key);
      }
    }
  }

  return {
    getUsers,
    getUser,
    authUser,
    createNewUser,
    getRecipes,
    getRecipe,
    getUserRecipes,
    getGlobalRecipes,
    getUserMealPlan,
    addRecipe,
    addIngredient,
    saveUserMealPlan,
    getUserShoppingList,
    deleteRecipe,
    updateRecipe,
    addFollowerIdToRecipe
  };
})(dbWrapper);



module.exports = ApiManager;
