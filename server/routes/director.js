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
  let movie_name;
  for(keys in director){
    if(keys="movie_name"){
      movie_name = director[keys];
    }
  }
  let newDirector = Object.keys(director).map((key) => {
    return director[key];
  });
  addTo.addDirector(newDirector,movie_name);
  res.send('New Director added');
})




module.exports = directorRouter;