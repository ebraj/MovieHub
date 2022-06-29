let mysql = require("mysql");

// dotenv file added to use env file
let dotenv = require("dotenv");
dotenv.config();

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD || "",
  database: 'movie_db',
});

module.exports = {
  connection,
};
