const express = require("express");
const {connection,addTo,displayTable} = require("../models");

const companyRouter = express.Router();


companyRouter.get("/", (req, res) => {
  connection.query(displayTable.showCompany,(err,results)=>{
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  })
});

companyRouter.post("/", (req, res) => {
  let company = req.body;
  let newCompany = Object.keys(company).map((key) => {
    return company[key];
  });
  addTo.addCompany(newCompany);
  res.send('New Company Added');
});


module.exports = companyRouter;
