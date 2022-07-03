const express = require("express");
const { connection,addTo, displayTable } = require("../models");


const quoteRouter = express.Router();

quoteRouter.get("/",(req,res)=>{
  connection.query(displayTable.showScript,(err,results)=>{
    if (err) console.log(`Error: ${err.message}`);
    res.send(results);
  });
});

quoteRouter.post("/",(req,res)=>{
  let quote = req.body;
  let newQuote = Object.keys(quote).map((key) => {
    return quote[key];
  });
  addTo.addQuotes(newQuote);
  res.send('Quote added');
});



module.exports = quoteRouter;

