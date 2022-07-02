const express = require("express");
const {connectOurDatabase} = require('./models');
const app = express();

/**
 * Importing the routes
 */
const castRouter = require("./routes/Cast");
const movieRouter = require("./routes/Movie");
const companyRouter = require("./routes/Company");
const actorRouter = require("./routes/actor");
const directorRouter = require("./routes/director");


/**
 * Express Middleware...
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectOurDatabase();

app.use("/casts", castRouter);
app.use("/", movieRouter);
app.use("/companies", companyRouter);
app.use("/actors",actorRouter);
app.use("/directors",directorRouter);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
