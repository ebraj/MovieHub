let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD || "",
});

module.exports = {
  connection,
};