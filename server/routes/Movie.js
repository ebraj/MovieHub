const express = require("express");
const { connection, displayTable, addTo, deleteFrom } = require("../models");
const { editTable } = require("../models/sql_queries");

const movieRouter = express.Router();

let movie = ["/", "/movies"];

movieRouter.get(movie, (req, res) => {
  connection.query(displayTable.showMovieDetail,(err,results)=>{
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  })
  // connection.query(displayTable.showMovies, (err, results) => {
  //   if (err) console.log(`Error: ${err.message}`);
  //   res.write(results);
  // });
  // connection.query(displayTable.showCast,(err,results)=>{
  //   if (err) console.log(`Error: ${err.message}`);
  //   res.write(results);
  // });
  // res.end("all done");
});

movieRouter.post("/", (req, res) => {
  let movieD = req.body;
  const newMovie = [
    movieD.movie_name,
    movieD.length,
    movieD.year_of_release,
    movieD.plot_outline,
    movieD.company_name,
  ];
  const newGenre = movieD.genres;
  console.log(newMovie, newGenre);
  addTo.addMovies(newMovie, newGenre);
  res.send("New movie added");
});

movieRouter.delete("/movies/:id", (req, res) => {
  let im_name = req.params.id;
  let m_name = im_name.replace(/-/g," ");
  console.log(m_name);
  connection.query(deleteFrom.deleteMovie, m_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.status(201).send("Movie Deleted");
  });
});

movieRouter.put("/movies/:id",(req,res)=>{
  let im_name = req.params.id;
  let movie_title = im_name.replace(/-/g," ");

  let movieD = req.body;
  const updatedMovie = [
    movieD.length,movieD.year_of_release,movieD.plot_outline,movieD.company_name,movie_title
  ];
  connection.query(editTable.editMovie,updatedMovie,(err)=>{
    if (err) console.log(`Error: ${err.message}`);
  });
  res.send("Movie updated");
});

module.exports = movieRouter;
