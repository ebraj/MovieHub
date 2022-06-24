

/**
 * Queries for creating tables
 */
const createTables = {
  companyTable:
    "create table if not exists production_company(name varchar(50) primary key, address varchar(65))",
  directorTable:
    "create table if not exists director (director_name varchar(50) primary key, director_DOB date)",
  actorTable:
    "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB date)",
  movieTable:
    "create table if not exists movie (title varchar(100) not null primary key,length varchar(20) default '0mins', year_of_release int(4), plot_outline varchar(250),company_name varchar(50), foreign key(company_name) references production_company(name) on delete cascade on update cascade)",

  // multivalue attribute genre referencing to title of movieTable
  genreTable:
    "create table if not exists Moviegenre (movie_name varchar(100),foreign key(movie_name) references movie(title) on delete cascade on update cascade, genre varchar(25))",
  
    // cardinal m-n relations to tables
  actedByTable:
    "create table if not exists acts(movie_title varchar(100),actor_name varchar(50), role varchar(50) primary key, foreign key(movie_title) references movie(title) on delete cascade on update cascade,foreign key(actor_name) references actor(actor_name) on delete cascade on update cascade)",
  directedByTable:
    "create table if not exists directs(movie_title varchar(100),director_name varchar(50), role varchar(50), foreign key(movie_title) references movie(title) on delete cascade on update cascade,foreign key(director_name) references director(director_name) on delete cascade on update cascade)",
  quoteTable:
    "create table if not exists MovieQuotes (role_played varchar(50),quote varchar(150),foreign key(role_played) references acts(role) on delete cascade on update cascade)",
  director_act:
    "create table if not exists DirActs(Movie_name varchar(100),Director_name varchar(50),role varchar(25), foreign key(Movie_name) references movie(title) on delete cascade on update cascade,foreign key(Director_name) references director(director_name) on delete cascade on update cascade)",
  
  };

/*
// Queries for insertion operations
*/
let tableName = "production_company";
let data = ["Bindabasini movies","Baneshwor,Kathmandu"];
let insertData = `insert into ${tableName} values (?,?) `;

let showTable = `select * from ${tableName}`;

module.exports = {
  createTables,
  insertData,
  showTable,
};
