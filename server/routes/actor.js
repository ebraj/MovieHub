const express = require("express");
const { connection,addTo, displayTable,deleteFrom } = require("../models");

const actorRouter = express.Router();


actorRouter.get("/",(req,res)=>{
  connection.query(displayTable.showActors,(err,results)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    res.send(results);
  })
})




actorRouter.post("/",(req,res)=>{
  let actor = req.body;
  let newActor = [actor.actor_name,actor.actor_DOB];
  addTo.addActors(newActor);
  res.send('New Actor Added');
});


actorRouter.delete("/:id",(req,res)=>{
  let actr = req.params.id;
  let actor_name = actr.replace(/-/g," ");
  connection.query(deleteFrom.deleteActor,actor_name,(err)=>{
      if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send("Actor Deleted");
  });
});

module.exports = actorRouter;