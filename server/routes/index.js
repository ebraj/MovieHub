const actorRouter = require('./actor');
const companyRouter = require('./Company');
const directorRouter = require('./director');
const quoteRouter = require('./quotes');
const movieRouter = require('./Movie');
const castRouter = require('./Cast');


module.exports = {
  actorRouter,
  companyRouter,
  directorRouter,
  quoteRouter,
  movieRouter,
  castRouter
}