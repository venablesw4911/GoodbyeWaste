var mysql = require('mysql');

//this works when i run node *filename
//was hoping i could atleast print it into the browser's console but it wasnt appearing
var con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "adminRole",
  password: "sharkRadar",
  database: "goodbyewaste"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});