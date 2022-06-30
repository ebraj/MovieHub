const express = require("express");
const companyRouter = express.Router();

let companyData = [];
companyRouter.get("/", (req, res, next) => {
  res.send("Companypage.");
});
companyRouter.post("/", (req, res, next) => {
  let company = req.body;
  let newCompany = Object.keys(company).map((key) => {
    return company[key];
  });
  addTo.addCompany(newCompany);
  res.send(company);
});
let newCompany = Object.keys(companyData).map((key) => {
  return obj[key];
});

// connection.query(insertInto.addProductionCompany,newCompany,(err)=>{
//   if(err) console.log(`Error: ${err.message}`);
// })

module.exports = companyRouter;
