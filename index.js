var express = require('express');
var mysql = require('mysql');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'jade');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: 'root',
  database : 'homecooked'
});

app.get('/', function(req, res) {
  connection.connect();

  connection.query('SELECT * from `users`', function(err, rows, fields) {
    if(err) throw err;
    console.log(rows[0]);
    res.render('index', rows[0]);
  });

  connection.end();


});

app.listen(3000, function() {
  console.log('Homecooked listening on port 3000!');
});
