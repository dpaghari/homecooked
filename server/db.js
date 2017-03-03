var mysql = require('mysql');

var dbWrapper = (function(mysql) {
  // if(process.env.NODE_ENV === "production") {
    var pool = mysql.createPool({
      host : 'us-cdbr-iron-east-04.cleardb.net',
      user : 'b13efb3091028d',
      password: '5be8e122',
      database : 'heroku_ca9001ccd1a294b'
    });
  // }
  // else {
    // var pool = mysql.createPool({
    //   host : 'localhost',
    //   user : 'root',
    //   password: 'root',
    //   database : 'homecooked'
    // });
  // }



  return {
    db: pool
  };

})(mysql);

module.exports = dbWrapper;
