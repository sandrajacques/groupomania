
var mysql = require('mysql');

var connect = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "groupomania",
multipleStatements:true

});

connect.connect(function(err) {
if (err) throw err;
console.log("Connection réussie!");
});

module.exports = connect;