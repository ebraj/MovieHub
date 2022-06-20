const express = require("express");
const app = express();

let mysql = require("mysql");
let { connection } = require("./components/config");
let { databaseName, companyTable } = require("./components/sql_queries");

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(databaseName, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    connection.query("USE mydb");
    connection.query(companyTable, function (err, result) {
      if (err) throw err;
      console.log("Company Table created");
    });
  });
});

app.listen(3001, () => {});
app.get("/", (req, res) => {
  res.send("Ebraj");
});
