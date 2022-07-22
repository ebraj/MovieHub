const { connection } = require("../config/config");
const queries = require("./sql_queries");

//connection.query(`use movie_db`);
function addCompany(data) {
  connection.query(
    queries.insertIntoTable.addProductionCompany,
    data,
    (err) => {
      if (err) console.log(`Error: ${err.message}`);
    }
  );
}

function addMovies(data, genre) {
  connection.query(queries.insertIntoTable.insertIntoMovies, data, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
  });
  connection.query(
    queries.insertIntoTable.addgenre,
    [data[0], genre],
    (err) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        return;
      }
      console.log("New movie added");
    }
  );
}

function addActors(actorData, actsData) {
  try {
    connection.query(queries.insertIntoTable.addActor, actorData, (err) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        return;
      }
    });
  } catch (err) {
    console.log("Duplicate Entry!");
  }
  connection.query(queries.insertIntoTable.addacting, actsData, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
  });
}

function addDirector(data, movie) {
  try {
    connection.query(queries.insertIntoTable.addDirector, data, (err) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        return;
      }
      console.log("New Director added");
    });
  } catch (err) {
    console.log("Duplicate entry for Director");
  } finally {
    connection.query(
      queries.insertIntoTable.adddirecting,
      [movie, data[0]],
      (err) => {
        if (err) {
          console.log(`Error: ${err.message}`);
          return;
        }
      }
    );
  }
}

function addQuotes(data) {
  connection.query(queries.insertIntoTable.addActorQuotes, data, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    console.log("New Director added");
  });
}

function editMovie(data, MovieName) {
  connection.query(queries.editTable.editMovie, data, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    console.log("Movie updated");
  });
}

function editActor(params) {}

function editDirector(params) {}

module.exports = {
  addCompany,
  addMovies,
  addActors,
  addDirector,
  addQuotes,
  editMovie,
};
