const mysql = require("mysql");
const express = require("express");
const sql = require('./components');
const { application } = require("express");

const app = express();

const PORT = 3000;

sql.connection.connect();
sql.connection.query(`create database if not exists movie_db`,function (err) {
  if(err) console.log(err.message);
  //else console.log(`DB created`);
});

sql.connection.query(`use movie_db`);
// Creating tables 
const qkeys = Object.keys(sql.createTable);
qkeys.forEach((key,index)=>{
  sql.connection.query(sql.createTable[key],function(err){
    if(err) console.log(err.message);
    //else console.log(`${key} created`);
});
});


// // Insertion operation
// let data = ["Gopi krishna","Baneshwor,Kathmandu"];
// sql.connection.query(sql.insertInto,data,function (err) {
//   if(err) console.log(err.message);
//   else console.log(`Data inserted successfully`);
// });

var table = new Object();

//Read operation
sql.connection.query(sql.displayTable.showMovies,(err,results,fields)=>{
  if(err) console.log(`Error: ${err.message}`);
  table = results;
});


app.get('/',(req,res)=>{
  res.send(table);
})

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
})


sql.connection.end();
