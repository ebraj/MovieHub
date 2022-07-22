const express = require("express");
const { connection, addTo, displayTable, deleteFrom } = require("../models");
const { editTable } = require("../models/sql_queries");

const companyRouter = express.Router();

companyRouter.get("/", (req, res) => {
  connection.query(displayTable.showCompany, (err, results) => {
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

companyRouter.post("/", (req, res) => {
  let company = req.body;
  let newCompany = [company.company_name, company.address];
  addTo.addCompany(newCompany);
  res.send("Company added");
});

companyRouter.delete("/:id", (req, res) => {
  let cname = req.params.id;
  let c_name = cname.replace(/-/g, " ");
  console.log(c_name);
  connection.query(deleteFrom.deleteCompany, c_name, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    res.status(201).send("Company Deleted");
  });
});

companyRouter.put("/:id", (req, res) => {
  let cname = req.params.id;
  let c_name = cname.replace(/-/g, " ");

  let companyDetail = req.body;
  let updatedCompanyAddress = companyDetail.address;
  connection.query(
    editTable.editCompany,
    [updatedCompanyAddress, c_name],
    (err) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        return;
      }
      res.send("Company Updated");
    }
  );
});
module.exports = companyRouter;
