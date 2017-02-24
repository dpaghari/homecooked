var mysql = require('mysql');

var dbWrapper = (function(mysql) {
  console.log(process.env.NODE_ENV);
  // if(process.env.NODE_ENV === "production") {
    var connection = mysql.createConnection({
      host : 'us-cdbr-iron-east-04.cleardb.net',
      user : 'b13efb3091028d',
      password: '5be8e122',
      database : 'heroku_ca9001ccd1a294b'
    });
  // }
  // else {
  //   var connection = mysql.createConnection({
  //     host : 'localhost',
  //     user : 'root',
  //     password: 'root',
  //     database : 'homecooked'
  //   });
  // }



  return {
    db: connection
  };

})(mysql);

module.exports = dbWrapper;
