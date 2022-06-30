const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res, next) => {
  res.send("Homepage.");
});
homeRouter.post("/", (req, res, next) => {});
module.exports = homeRouter;
