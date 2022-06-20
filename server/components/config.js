let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ebrajmysql",
});

module.exports = {
  connection,
};
