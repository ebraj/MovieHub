const mysql = require("mysql");
const express = require("express");
let { connection } = require("./components/config");
let { databaseName, createDatabase } = require("./components/sql_queries");

connection.connect();

connection.query(createDatabase, function (error, results, fields) {
  if (error) throw error;
  console.log("Database Created.");
});

connection.end();
