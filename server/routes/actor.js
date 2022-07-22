const express = require("express");
const {
  connection,
  addTo,
  displayTable,
  deleteFrom,
  editTable,
} = require("../models");

const actorRouter = express.Router();

actorRouter.get("/", (req, res) => {
  connection.query(displayTable.showActors, (err, results) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send(results);
  });
});

actorRouter.post("/", (req, res) => {
  let actor = req.body;
  let newActor = [actor.actor_name, actor.actor_DOB];
  let updateActor = [actor.movie_name, actor.actor_name, actor.role];
  addTo.addActors(newActor, updateActor);
  res.send("New Actor Added");
});

actorRouter.delete("/:id", (req, res) => {
  let actr = req.params.id;
  let actor_name = actr.replace(/-/g, " ");
  connection.query(deleteFrom.deleteActor, actor_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send("Actor Deleted");
  });
});

actorRouter.put("/:id", (req, res) => {
  let actr = req.params.id;
  console.log(actr);
  let actor_name = actr.replace(/-/g, " ");

  console.log(actor_name);
  let actorDetail = req.body;
  let updatedActorDOB = actorDetail.actor_DOB;
  // let updatedActs = [actorDetail.movie_name,actorDetail.role];
  connection.query(
    editTable.editActor,
    [updatedActorDOB, actor_name],
    (err) => {
      if (err) console.log(`Error: ${err.message}`);
    }
  );
  connection.query(
    editTable.editActs,
    [actorDetail.movie_name, actorDetail.role, actor_name],
    (err) => {
      if (err) console.log(`Error: ${err.message}`);
    }
  );
  res.send("New Actor added");
});

module.exports = actorRouter;
