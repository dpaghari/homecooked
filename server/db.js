var mysql = require('mysql');

var dbWrapper = (function(mysql) {
  var pool;
  console.log("HC ENV IS EQUAL TO: ", process.env.HC_ENV);
  if(process.env.HC_ENV === "production") {
    pool = mysql.createPool({
      host : 'us-cdbr-iron-east-04.cleardb.net',
      user : 'b13efb3091028d',
      password: '5be8e122',
      database : 'heroku_ca9001ccd1a294b'
    });
  }
  else {
    pool = mysql.createPool({
      host : 'localhost',
      user : 'root',
      password: 'root',
      database : 'homecooked'
    });
  }

  return {
    mysql,
    db: pool
  };

})(mysql);

module.exports = dbWrapper;
