const express = require("express");
const { connection,addTo, displayTable } = require("../models");

const directorRouter = express.Router();

directorRouter.get("/",(req,res)=>{
  connection.query(displayTable.showDirector,(err,results)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    res.send(results);
  });
});



directorRouter.post("/",(req,res)=>{
  let director = req.body;
  let movie_name = director.movie_name;
  let newDirector = [director.director_name, director.director_DOB];
  addTo.addDirector(newDirector,movie_name);
  res.send('New Director added');
})




module.exports = directorRouter;