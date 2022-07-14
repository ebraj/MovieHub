const express = require("express");
const cors = require("cors");
const { connectOurDatabase } = require("./models");
const app = express();

/**
 * Importing the routes
 */
const {
  castRouter,
  movieRouter,
  companyRouter,
  actorRouter,
  directorRouter,
  quoteRouter,
} = require("./routes");

/**
 * Express Middleware...
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectOurDatabase();

app.use("/casts", castRouter);
app.use("/", movieRouter);
app.use("/companies", companyRouter);
app.use("/actors", actorRouter);
app.use("/directors", directorRouter);
app.use("/quotes", quoteRouter);

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
