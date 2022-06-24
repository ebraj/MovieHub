const config = require('./config');
const query = require('./sql_queries');



module.exports ={
  connection :config.connection,
  createTable : query.createTables,
  insertInto : query.insertData,
  displayTable : query.showTable,
}