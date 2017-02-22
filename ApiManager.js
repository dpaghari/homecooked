var dbWrapper = require("./db.js");
var ApiManager = (function(dbWrapper) {
  var test = 0;

  function getUsers(callback) {
    var users;
    var db = dbWrapper.db;
    db.connect();
    db.query('SELECT * from `users`', function(err, rows, fields) {
      if(err) throw err;
      // console.log(rows[0]);
      users = rows;
      if(typeof callback === "function") {
        callback(users);
      }
    });
  }
  function getRecipes(callback) {
    var recipes;
    var db = dbWrapper.db;
    db.connect();
    db.query('SELECT * from `recipes`', function(err, rows, fields) {
      if(err) throw err;
      // console.log(rows[0]);
      recipes = rows;
      if(typeof callback === "function") {
        callback(recipes);
      }
    });
  }

  function addRecipe() {
    
  }

  return {
    getUsers: getUsers,
    getRecipes: getRecipes
  };
})(dbWrapper);



module.exports = ApiManager;
