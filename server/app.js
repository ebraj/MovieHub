const express = require("express");
const app = express();

/**
 * Importing the routes
 */
const homeRouter = require("./routes/Home");
const castRouter = require("./routes/Cast");
const movieRouter = require("./routes/Movie");
const companyRouter = require("./routes/Company");

/**
 * Object Destructuring...
 */
const {
  connection,
  createDB,
  createTable,
  insertInto,
  displayTable,
  addTo,
} = require("./models");

/**
 * Express Middleware...
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.connect();
/**
 * Creating the Database and using it...
 */
connection.query(createDB.movieDB, function (err) {
  if (err) {
    console.log(err.message);
  } else {
    connection.query("use movie_db");

    /**
     * Creating Tables...
     */
    const qkeys = Object.keys(createTable);
    qkeys.forEach((key) => {
      connection.query(createTable[key], function (err) {
        if (err) console.log(err.message);
      });
    });
  }
});

app.use("/", homeRouter);
app.use("/cast", castRouter);
app.use("/movie", movieRouter);
app.use("/company", companyRouter);
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
