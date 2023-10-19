import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

export const pool = mysql
	.createPool({
		host: process.env.DB_LOACALHOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		connectionLimit: 10
	})
	.promise()

function generateRandomString(length: number) {
	let result = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
	}
	return result
}
export const sessionSecret =
	process.env.SESSION_SECRET || generateRandomString(64)
