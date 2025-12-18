import mysql from "mysql2/promise";

console.log(process.env.MARIADB_HOST, process.env.MARIADB_USERNAME, process.env.PASSWORD, process.env.MARIADB_DATABASE);

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
const pool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.MARIADB_DATABASE,
});

export default pool;
