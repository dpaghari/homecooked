var mysql = require('mysql');

var dbWrapper = (function(mysql) {
  var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'root',
    database : 'homecooked'
  });


  return {
    db: connection
  };

})(mysql);

module.exports = dbWrapper;
