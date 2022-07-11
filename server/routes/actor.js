const express = require("express");
const { connection,addTo, displayTable } = require("../models");

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


module.exports = actorRouter;