// mongodb uri: mongodb://heroku_x8m53gnh:u48jcn16ffkibd0pjjclvgv108@ds133601.mlab.com:33601/heroku_x8m53gnh
// local: mongodb://localhost:27017/homecooked
// To-do: switch to mongodb


var mysql = require('mysql');
var dbWrapper = (function(mysql) {
  var pool;

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
      password: '',
      database : 'homecooked',
      port: 3306
    });
  }
  
  return {
    mysql,
    db: pool
  };
})(mysql);


module.exports = dbWrapper;
