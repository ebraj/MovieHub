let databaseName = "movie_db";

/**
 * Creating the Database
 */
let createDatabase = `CREATE DATABASE if not exists ${databaseName}`;

/**
 * Defining the queries...
 */
const createTable = [
  "create table if not exists production_company(name varchar(50) primary key,address varchar(50))",
  "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB date)",
  "create table if not exists director (director_name varchar(50) primary key, director_DOB date)",
  "create table if not exists movie (title varchar(100) primary key,prod_company varchar(50),length varchar(20) not null default 0mins, year_of_release int(4), plot_outline varchar(250)),foreign key(prod_company) references production_company(name)",
  
  // multivalue attribute genre referencing to title of movieTable
  "create table if not exists Moviegenre (title foreign key, genre varchar(25))",

  //table for m to n relaltions (acted by )
  "create table if not exists acts (movie_name varchar(100),actor_name varchar(50),foreign key(movie_name) references movie(movie_name),foreign key(actor_name) references actor(actor_name),role varchar(50) primary key)",
  "create table if not exists movieQuotes(role varchar(50),quotes varchar(250))"
]






/**
 * Exporting the modules
 */
module.exports = {
  databaseName,
  createDatabase,
};
