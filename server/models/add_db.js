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
    if (err) {console.log(`Error: ${err.message}`);return}
  })
  connection.query(queries.insertIntoTable.addgenre,[data[0],genre],(err)=>{
    if (err) {console.log(`Error: ${err.message}`);return;}
      console.log("New movie added");
  })
}

function addActors(data) {
  connection.query(queries.insertIntoTable.addActor,data,(err)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    console.log('New actor added');
  })
}

function addDirector(data,movie) {
  connection.query(queries.insertIntoTable.addDirector,data,(err)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    console.log('New Director added');
  })
  connection.query(queries.insertIntoTable.adddirecting,[movie,data[0]]);
}

function addQuotes(data) {
  connection.query(queries.insertIntoTable.addActorQuotes,data,(err)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    console.log('New Director added');
  })
}


function editMovie(data,MovieName){
  connection.query(queries.editTable.editMovie,data,(err)=>{
    if (err) {console.log(`Error: ${err.message}`);return}
    console.log('Movie updated');
  })
}

module.exports = {
  addCompany,addMovies,addActors,addDirector,addQuotes,
};
