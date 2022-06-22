const mysql = require("mysql");
const express = require("express");
const sql = require('./components');

// let { connection } = require("./components/config");
// let queries = require("./components/sql_queries");

sql.connection.connect();

sql.connection.query(sql.queries.createDatabase, function (error, results, fields) {
  if (error) throw error;
  console.log("Database Created.");
});

sql.connection.end();
