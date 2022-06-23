const mysql = require("mysql");
const express = require("express");
const sql = require('./components');


sql.connection.connect();
sql.connection.query(`create database if not exists movie_db`,function (err) {
  if(err) console.log(err.message);
  else console.log(`DB created`);
});

sql.connection.query(`use movie_db`);

const qkeys = Object.keys(sql.createTable);

qkeys.forEach((key,index)=>{
  sql.connection.query(sql.createTable[key],function(err){
    if(err) console.log(err.message);
    else console.log(`${key} created`);
});
});





sql.connection.end();
