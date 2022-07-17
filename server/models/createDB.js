const { connection } = require("../config/config");
const { createDB, createTables } = require("./sql_queries");

function connectOurDatabase() {
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
      const qkeys = Object.keys(createTables);
      qkeys.forEach((key) => {
        connection.query(createTables[key], function (err) {
          if (err) console.log(err.message);
        });
      });
    }
  });
}

module.exports = connectOurDatabase;
