const express = require("express");
const { connection, addTo, displayTable, deleteFrom } = require("../models");

const companyRouter = express.Router();

companyRouter.get("/", (req, res) => {
  connection.query(displayTable.showCompany, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

companyRouter.post("/", (req, res) => {
  let company = req.body;
  let newCompany = [company.name, company.address];
  addTo.addCompany(newCompany);
  res.send("Company added");
});

companyRouter.delete("/:id", (req, res) => {
  let c_name = req.params.id;
  connection.query(deleteFrom.deleteCompany, c_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.status(201).send("Company Deleted");
  });
});

module.exports = companyRouter;
