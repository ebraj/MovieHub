const config = require("../config/config");
const query = require("./sql_queries");
const addDB = require("./add_db");

module.exports = {
  connection: config.connection,
  createDB: query.createDB,
  createTable: query.createTables,
  insertInto: query.insertIntoTable,
  displayTable: query.showTable,
  addTo: addDB,
};
