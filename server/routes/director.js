const express = require("express");
const { connection, addTo, displayTable, deleteFrom } = require("../models");
const { editTable } = require("../models/sql_queries");

const directorRouter = express.Router();

directorRouter.get("/", (req, res) => {
  connection.query(displayTable.showDirector, (err, results) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send(results);
  });
});

directorRouter.post("/", (req, res) => {
  let director = req.body;
  let isActor = director.isActor;
  let movie_name = director.movie_name;
  let newDirector = [director.director_name, director.director_DOB];
  addTo.addDirector(newDirector, movie_name);
  if (isActor) {
    let newDirectorActs = [movie_name, director.director_name, director.role];
    console.log(newDirectorActs);
    addTo.addActors(newDirector, newDirectorActs);
  }
  res.send("New Director added");
});

directorRouter.delete("/:id", (req, res) => {
  let directr = req.params.id;
  let directr_name = directr.replace(/-/g, " ");
  connection.query(deleteFrom.deleteDirector, directr_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send("Director Deleted");
  });
});

directorRouter.put("/:id", (req, res) => {
  let directr = req.params.id;
  let directr_name = directr.replace(/-/g, " ");

  let directorDetail = req.body;
  const updatedDirectorDOB = directorDetail.director_DOB;

  connection.query(
    editTable.editDirector,
    [updatedDirectorDOB, directr_name],
    (err) => {
      if (err) console.log(`Error: ${err.message}`);
      res.send("Director updated");
    }
  );
});

module.exports = directorRouter;
