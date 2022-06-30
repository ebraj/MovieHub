const express = require("express");
const castRouter = express.Router();
const { connection, displayTable } = require("../models");

castRouter.get("/", (req, res, next) => {
  let cast;
  connection.query(displayTable.showCast, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    cast = results;
  });
  res.json({ ...cast });
});

castRouter.post("/", (req, res) => {});
module.exports = castRouter;
