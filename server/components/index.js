const config = require('./config');
const query = require('./sql_queries');

// console.log(query.)


module.exports ={
  connection :config.connection,
  queries : query,
}