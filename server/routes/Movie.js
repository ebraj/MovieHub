const express = require("express");
const movieRouter = express.Router();

movieRouter.get("/", (req, res, next) => {
  res.send("Moviepage.");
  //Read operation
  // connection.query(displayTable.showMovies, (err, results) => {
  //   if (err) console.log(`Error: ${err.message}`);
  //   movie = results;
  //   console.log(movie);
  // });
});
movieRouter.post("/", (req, res, next) => {});

module.exports = movieRouter;

// // Insertion operation
// let data = ["Gopi krishna","Baneshwor,Kathmandu"];
// connection.query(insertInto,data,function (err) {
//   if(err) console.log(err.message);
//   else console.log(`Data inserted successfully`);
// });
