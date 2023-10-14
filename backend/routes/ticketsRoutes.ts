import express, { Request, Response } from 'express'
import { pool } from '../util'
import { formatDistanceToNow } from 'date-fns';
import { RowDataPacket } from 'mysql2';

export const ticketsRoutes = express.Router()

ticketsRoutes.get('/', getAllTickets)

async function getAllTickets(req: Request, res: Response) {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			`SELECT
		              t.id,
		              CONCAT(u.first_name, ' ', u.last_name) AS requester,
		              t.modules,
		              t.subject,
		              t.cs,
		              t.priority,
		              t.status,
		              t.last_message
		            FROM
		              tickets t
		            INNER JOIN
		              users u
		            ON
		              t.requester_id = u.id;`)
		const formattedRes = result.map((result) => ({
			...result,
			last_message: formatDistanceToNow(result.last_message, { addSuffix: true }),
		}));
		res.json(formattedRes);
	} catch (err) {
		console.error('Error querying MySQL:', err)
		res.status(500).json({ error: 'Database error' })
	}
}