const mysql = require("mysql");
const express = require("express");
const sql = require('./components');


sql.connection.connect();

sql.connection.query(sql.queries.createDatabase, function (error, results, fields) {
  if (error) throw error;
  console.log("Database Created.");
});

sql.connection.end();
