const express = require("express");
const { connection, displayTable } = require("../models");

const castRouter = express.Router();

castRouter.get("/", (req, res) => {
  connection.query(displayTable.showCastDetails, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    cast = results;
    res.send(cast);
  });
});

castRouter.post("/", (req, res) => {});
module.exports = castRouter;
