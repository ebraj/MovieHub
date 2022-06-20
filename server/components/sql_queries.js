let databaseName = "movie_db";

/**
 * Creating the Database
 */
let createDatabase = `CREATE DATABASE if not exists ${databaseName}`;

/**
 * Defining the queries...
 */

/**
 * Exporting the modules
 */
module.exports = {
  databaseName,
  createDatabase,
};
