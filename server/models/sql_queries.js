/**
 * Queries for creating tables
 */
const createDB = {
  movieDB: "create database if not exists movie_db",
};

const createTables = {
  companyTable:
    "create table if not exists production_company(company_name varchar(50) primary key, address varchar(65))",
  movieTable:
    "create table if not exists movie (movie_name varchar(100) not null primary key,length varchar(20), year_of_release int(4), plot_outline varchar(800),company_name varchar(50), foreign key(company_name) references production_company(company_name) on delete cascade on update cascade)",
  directorTable:
    "create table if not exists director (director_name varchar(50) primary key, director_DOB varchar(30))",
  actorTable:
    "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB varchar(30))",

  /**
   * Multivalue attribute genre referencing to title of movieTable
   */
  genreTable:
    "create table if not exists Moviegenre (movie_name varchar(100),foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade, genre varchar(25))",

  /**
   * Cardinal m-n relations to tables
   */
  actedByTable:
    "create table if not exists acts(movie_name varchar(100),actor_name varchar(50), role_played varchar(50) primary key, foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(actor_name) references actor(actor_name) on delete cascade on update cascade)",
  directedByTable:
    "create table if not exists directs(movie_name varchar(100),director_name varchar(50), foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(director_name) references director(director_name) on delete cascade on update cascade)",
  director_act:
    "create table if not exists DirActs(Movie_name varchar(100),Director_name varchar(50),role_played varchar(25) primary key, foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(Director_name) references director(director_name) on delete cascade on update cascade)",
  actorQuoteTable:
    "create table if not exists actorquotes (role_played varchar(50),quote varchar(150),foreign key(role_played) references acts(role_played) on delete cascade on update cascade)",
  directorQuoteTable:
    "create table if not exists directorquotes (role_played varchar(25),quote varchar(150),foreign key(role_played) references dirActs(role_played) on delete cascade on update cascade)",
};

/**
 * Queries for insertion operations
 */
const insertIntoTable = {
  addProductionCompany: "insert into production_company values(?,?)",
  addgenre: "insert into moviegenre values(?,?)",
  insertIntoMovies: "insert into movie values(?,?,?,?,?)",
  addActor: "insert into actor values(?,?)",
  addacting: "insert into acts values(?,?,?)",
  addDirector: "insert into director values(?,?)",
  adddirecting: "insert into directs values(?,?)",
  addActorQuotes: "insert into actorquotes values(?,?)",
  addDirector_as_actor: "insert into diracts values(?,?)",
  addDirectorQuotes: "inset into directorquotes values (?,?)",
};

const showTable = {
  showGenres: "select distinct genre from moviegenre",
  showMovies:
    "select movie.movie_name,length,year_of_release,plot_outline,company_name,group_concat(distinct genre) as genres from movie natural join moviegenre group by movie_name",
  showMovie:
    "select distinct movie.movie_name,length,year_of_release,plot_outline,company_name, genre as genres from movie natural join moviegenre where movie.movie_name = ? ",
  showMovieDetail:
    "select movie.movie_name,length,year_of_release,plot_outline,company_name, genre as genres  ,group_concat(distinct actor_name) as actors,director_name from movie natural join acts natural join directs,moviegenre  where movie.movie_name = ? group by movie_name",
  showCast:
    "select acts.movie_name ,director_name, group_concat(distinct acts.actor_name) as actors from directs,acts,actor group by movie_name",
  showCastDetails: "select * from actor natural join acts",
  showDirector: "select * from director natural join directs",
  showCompany: "select * from production_company",
  showActors:
    "Select actor_name,actor_DOB,movie_name from actor natural join acts union select director_name as actor_name ,movie_name,role_played from diracts",
  showScript:
    "select * from actorquotes union select * from directorquotes order by role_played",
  showCompanyDetail:
    "select m.company_name, group_concat(m.movie_name) as movies, p.address from movie m inner join production_company p on m.company_name = p.company_name group by m.company_name",
};

const deleteFrom = {
  deleteMovie: "delete from movie where movie_name = ?",
  deleteGenre: "delete from moviegenre where movie_name = ?",
  deleteCompany: "delete from production_company where company_name = ?",
  deleteActor: "delete from actor where actor_name = ?",
  deleteDirector: "delete from director where director_name = ? ",
  deleteActorScript: "delete from actorquotes where role_played = ?",
  deleteActing: "delete from acts where movie_name = ?",
  deleteDirecting: "delete from directs where movie_name = ?",
  deleteDiracting: "delete from diracts where movie_name = ?",
  deleteDirectorScript: "delete from directorquotes where role_played = ?",
};

const editTable = {
  editMovie:
    "update movie set length = ?,year_of_release=?,plot_outline =?,company_name =? where movie_name = ?",
  editGenre: " update moviegenre set genre = ? where movie_name = ?",
  editDirector: "update director set director_DOB = ? where director_name = ?",
  editActor: "update actor set actor_DOB = ? where actor_name = ?",
  editCompany:
    "update production_company set address = ? where company_name = ?",
  editActs:
    "update acts set movie_name = ?, role_played = ? where actor_name = ?",
  editQuotes: "update actorquotes set quote = ? where role_played = ?",
};

module.exports = {
  createDB,
  createTables,
  insertIntoTable,
  showTable,
  deleteFrom,
  editTable,
};
