import express, { Request, Response } from 'express'
import { pool } from '../util'

export const ticketsRoutes = express.Router()

ticketsRoutes.get('/', getAllTickets)

function getAllTickets(req: Request, res: Response) {
	pool.getConnection((err, connection) => {
		if (err) {
			console.error('Error getting database connection:', err)
			return res.status(500).json({ error: 'Database error' })
		}

		connection.query(
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
              t.requester_id = u.id;`,
			(err, results) => {
				connection.release()

				if (err) {
					console.error('Error querying MySQL:', err)
					return res.status(500).json({ error: 'Database error' })
				}

				res.json(results)
				return undefined
			}
		)
		return undefined
	})
}
