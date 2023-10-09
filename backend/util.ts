import dotenv from 'dotenv';
import mysql from 'mysql2';


dotenv.config()

const host = process.env.DB_LOACALHOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
});