let myDB = "mydb";
let databaseName = `CREATE DATABASE if not exists ${myDB}`;
let companyTable =
  "create table if not exists todos(id int primary key auto_increment, title varchar(255)not null default 0)";

module.exports = {
  databaseName,
  companyTable,
};
