const express = require("express");
const { connection, displayTable, addTo, deleteFrom } = require("../models");
const { editTable } = require("../models/sql_queries");

const movieRouter = express.Router();

let movie = ["/", "/movies"];
movieRouter.get(movie, (req, res) => {
  connection.query(displayTable.showMovies, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

movieRouter.get("/movies/:id", (req, res) => {
  let im_name = req.params.id;
  let m_name = im_name.replace(/-/g, " ");
  let finalResult = {};
  connection.query(displayTable.showMovieDetail, m_name, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    const isEmpty = Object.keys(results).length === 0;
    finalResult = results;
    if (isEmpty) {
      connection.query(displayTable.showMovie, m_name, (error, result) => {
        if (error) console.log(`Error: ${error.message}`);
        finalResult = result;
        res.send(finalResult);
      });
    } else {
      res.send(finalResult);
    }
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
  let im_name = req.params.id;
  let m_name = im_name.replace(/-/g, " ");
  console.log(m_name);
  connection.query(deleteFrom.deleteMovie, m_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.status(201).send("Movie Deleted");
  });
});

movieRouter.put("/movies/:id", (req, res) => {
  let im_name = req.params.id;
  let movie_title = im_name.replace(/-/g, " ");

  let movieD = req.body;
  const updatedMovie = [
    movieD.length,
    movieD.year_of_release,
    movieD.plot_outline,
    movieD.company_name,
    movie_title,
  ];
  connection.query(editTable.editMovie, updatedMovie, (err) => {
    if (err) console.log(`Error: ${err.message}`);
  });
  res.send("Movie updated");
});

module.exports = movieRouter;
