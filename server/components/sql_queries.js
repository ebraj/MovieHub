/**
 * Queries
 */
const queries = {
  createDatabase: `CREATE DATABASE if not exists movie_db`,
  companyTable:
    "create table if not exists production_company(name varchar(50) int primary key auto_increment, title varchar(255)not null default 0)",
  actorTable:
    "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB date)",
  directorTable:
    "create table if not exists director (director_name varchar(50) primary key, director_DOB date)",
  movieTable:
    "create table if not exists movie (title varchar(100) not null primary key,length varchar(20) not null default 0mins, year_of_release int(4), plot_outline varchar(250))",
  // multivalue attribute genre referencing to title of movieTable
  genreTable:
    "create table if not exists Moviegenre (title foreign key, genre varchar(25))",
};

module.exports = queries;
