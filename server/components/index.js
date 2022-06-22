const config = require('./config');
const query = require('./sql_queries');



module.exports ={
  connection :config.connection,
  queries : query,
}