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

  function addRecipe(callback) {
    let recipes;
    let { db } = dbWrapper;
    db.query('INSERT INTO `recipes` SET ?', {name: recipe_info.name, recipe_image: recipe_info.recipe_image}, function (err, rows, fields) {
      if(typeof callback === "function") {
        callback(recipe_id);
      }
    });
  }

  return {
    getUsers,
    getRecipes,
    addRecipe
  };
})(dbWrapper);



module.exports = ApiManager;
