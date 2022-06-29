const express = require("express");
const sql = require('./components');
// const mysql = require('mysql');

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

app.use(express.json());
app.use(express.urlencoded({extended:false}));


var companyData = [];

app.post('/',(req,res)=>{
  var company = req.body;
  var newCompany = Object.keys(company).map((key) =>{
    return company[key];
    });
  sql.addTo.addCompany(newCompany);
  //companyData.push(company);
  res.send(company);
})
var newCompany = Object.keys(companyData).map((key) =>{
  return obj[key];
});

console.log(newCompany);

// sql.connection.query(sql.insertInto.addProductionCompany,newCompany,(err)=>{
//   if(err) console.log(`Error: ${err.message}`);
// })


// // Insertion operation
// let data = ["Gopi krishna","Baneshwor,Kathmandu"];
// sql.connection.query(sql.insertInto,data,function (err) {
//   if(err) console.log(err.message);
//   else console.log(`Data inserted successfully`);
// });




var movie = new Object();
var cast = new Object();

//Read operation
sql.connection.query(sql.displayTable.showMovies,(err,results)=>{
  if(err) console.log(`Error: ${err.message}`);
  movie = results;
});
sql.connection.query(sql.displayTable.showCast,(err,results)=>{
  if(err) console.log(`Error: ${err.message}`);
  cast = results;
})


var movieRoute = ['/','/movies'];
app.get('movieRoute',(req,res)=>{
  res.send(movie);
})

app.get('/cast',(req,res)=>{
  res.send(cast);
})









app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
})

//sql.connection.end();
