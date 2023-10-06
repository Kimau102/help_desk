import dotenv from 'dotenv';
import mysql from 'mysql2';


dotenv.config()

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const connection = mysql.createConnection({
  user,
  password,
  database,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

connection.query('SELECT * FROM your_table', (err, results) => {
  if (err) {
    console.error('Error querying MySQL:', err);
    return;
  }
  console.log('Query results:', results);
});

connection.end();