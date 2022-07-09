const express = require("express");
const { connection, displayTable , addTo,deleteFrom} = require("../models");

const movieRouter = express.Router();

let movie = ["/","/movies"];

movieRouter.get(movie, (req, res) => {
  connection.query(displayTable.showMovies, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

movieRouter.post("/", (req, res) => {
  let movieD = req.body;
  let genre;
  for(let key in movieD){
    if(key === "genre")
    {genre = movieD[key];}
  }
  let newMovie = Object.keys(movieD).map((key) => {
    return movieD[key];
  });
  addTo.addMovies(newMovie,genre);
  res.send("New movie added");
});

movieRouter.delete("/movies/:id", (req,res)=>{
  let m_name = req.params.id;
  connection.query(deleteFrom.deleteMovie,m_name,(err)=>{
    if (err){ console.log(`Error: ${err.message}`);return;}
    res.status(201).send('Movie Deleted');
  })
})


module.exports = movieRouter;