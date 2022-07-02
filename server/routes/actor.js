const express = require("express");
const { connection,addTo, displayTable } = require("../models");

const actorRouter = express.Router();


actorRouter.get("/",(req,res)=>{
  connection.query(displayTable.showActors,(err,results)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    res.send(results);
  })
})

// movieRouter.post("/", (req, res) => {
//   let movieD = req.body;
//   let genre;
//   for(let key in movieD){
//     if(key === "genre")
//     {genre = movieD[key];}
//   }
//   let newMovie = Object.keys(movieD).map((key) => {
//     return movieD[key];
//   });
//   addTo.addMovies(newMovie,genre);
//   res.send("New movie added");
// });
// actorRouter.post("/",(req,res)=>{
//   let actor = req.body;
//   let attr;
//   for(let key in actor){
//     if(key === "actor_name")
//     {attr =}
//   }
//   let newActor = Object.keys(actor).map((key) => {
//     return actor[key];
//   });
//   addTo.addActors(newActor);
//   res.send('New Actor Added');
// });





actorRouter.post("/",(req,res)=>{
  let actor = req.body;
  let newActor = Object.keys(actor).map((key) => {
    return actor[key];
  });
  addTo.addActors(newActor);
  res.send('New Actor Added');
});


module.exports = actorRouter;