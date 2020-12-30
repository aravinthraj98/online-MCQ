import mysql from 'mysql'
let connection=mysql.createPool({
  connectionLimit:100,
  host: "localhost",
  user: "root",
  password:"",
  database:"competition"
  
});

export default connection;