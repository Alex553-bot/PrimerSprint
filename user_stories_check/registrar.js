var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO deportes (nombre, algo) VALUES ('patitoball', '2')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    })
});