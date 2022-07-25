const express = require("express");
const {
  connection,
  addTo,
  displayTable,
  deleteFrom,
  editTable,
} = require("../models");

const quoteRouter = express.Router();

quoteRouter.get("/", (req, res) => {
  connection.query(displayTable.showScript, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

quoteRouter.post("/", (req, res) => {
  let quo = req.body;
  console.log(quo);
  let newQuote = [quo.role_played, quo.quote];
  addTo.addQuotes(newQuote);
  res.send("Quote added");
});

quoteRouter.delete("/:id", (req, res) => {
  let roles = req.params.id;
  let role = roles.replace(/-/g, " ");
  connection.query(deleteFrom.deleteActorScript, role, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.send("Quote Deleted");
  });
});

quoteRouter.put("/:id", (req, res) => {
  let quotes = req.params.id;
  let role = quotes.replace(/-/g, " ");

  let quoteBody = req.body;
  const updatedQuote = quoteBody.quote;

  connection.query(editTable.editQuotes, [updatedQuote, role], (err) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send("Quote updated");
  });
});

module.exports = quoteRouter;
