
/**
 * Queries
 */
const queryobj = {
  createDatabase: `CREATE DATABASE if not exists movie_db`,
  companyTable:
    "create table if not exists production_company(name varchar(50) primary key, address varchar(65))",
  directorTable:
    "create table if not exists director (director_name varchar(50) primary key, director_DOB date)",
  actorTable:
    "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB date,director_as_actor )",
  movieTable:
    "create table if not exists movie (title varchar(100) not null primary key,length varchar(20) not null default 0mins, year_of_release int(4), plot_outline varchar(250),company_name varchar(50), foreign key(company_name) references production_company(name) on delete cascade on update cascade)",

  // multivalue attribute genre referencing to title of movieTable
  genreTable:
    "create table if not exists Moviegenre (movie_name varchar(100),foreign key(movie_name) references movie(title) on delete cascade on update cascade, genre varchar(25))",
  // cardinal m-n relations to tables
  actedByTable:
    "create table if not exists acts(movie_title varchar(100),actor_name varchar(50), role varchar(50) primary key, foreign key(movie_title) references movie(title) on delete cascade on update cascade,foreign key(actor_name) references actor(actor_name) on delete cascade on update cascade",
  directedByTable:
    "create table if not exists directs(movie_title varchar(100),director_name varchar(50), role varchar(50), foreign key(movie_title) references movie(title) on delete cascade on update cascade,foreign key(director_name) references actor(director_name) on delete cascade on update cascade",
  quoteTable:
    "create table if not exists MovieQuotes (character varchar(50),quote varchar(150),foreign key(character) references acts(role) on delete cascade on update cascade)"
};

module.exports = queryobj;
