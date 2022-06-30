const express = require("express");
const { connection, displayTable } = require("../models");

const movieRouter = express.Router();

let movie = ["/","/movies"];

movieRouter.get(movie, (req, res) => {
  connection.query(displayTable.showMovies, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    movie = results;
    res.send(movie);
  });
});
movieRouter.post("/", (req, res) => {});

module.exports = movieRouter;