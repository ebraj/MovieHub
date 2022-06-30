const { connection } = require("../config/config");
const queries = require("./sql_queries");

//connection.query(`use movie_db`);

function addCompany(data) {
  connection.query(
    queries.insertIntoTable.addProductionCompany,
    data,
    (err) => {
      if (err) console.log(`Error: ${err.message}`);
      else console.log("New Company added");
    }
  );
}

function addMovies(data,genre) {
  connection.query(queries.insertIntoTable.insertIntoMovies,data,(err)=>{
    if (err) console.log(`Error: ${err.message}`);
    else console.log("New movie added");
  })
  connection.query(queries.insertIntoTable.addgenre,[data[0],genre],(err)=>{
    if (err) console.log(`Error: ${err.message}`);
  })
}





module.exports = {
  addCompany,addMovies
};
