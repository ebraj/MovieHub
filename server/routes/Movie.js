const express = require("express");
const { connection, displayTable, addTo, deleteFrom } = require("../models");

const movieRouter = express.Router();

let movie = ["/", "/movies"];

movieRouter.get(movie, (req, res) => {
  connection.query(displayTable.showMovies, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
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
  let m_name = req.params.id;
  connection.query(deleteFrom.deleteMovie, m_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.status(201).send("Movie Deleted");
  });
});

module.exports = movieRouter;
