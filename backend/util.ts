import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

export const pool = (mysql.createPool({
	host: process.env.DB_LOACALHOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 10
})).promise()
