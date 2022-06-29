const {connection} = require('./config');
const queries = require('./sql_queries');

//connection.query(`use movie_db`);

function addCompany(data) {
  connection.query(queries.insertIntoTable.addProductionCompany,data,(err)=>{
  if (err) console.log(`Error: ${err.message}`);
  else console.log('Values added');
});
}


module.exports ={
  addCompany,
}