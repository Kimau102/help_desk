import express, { Request, Response } from 'express'
import { pool } from '../util'
import { formatDistanceToNow } from 'date-fns'
import { RowDataPacket } from 'mysql2'

export const ticketsRoutes = express.Router()

ticketsRoutes.get('/', getAllTickets)
ticketsRoutes.post('/', createTicket)

async function getAllTickets(req: Request, res: Response) {
	try {
		if (
			req.session.admin_authorization === 1
		) {
			const [result] = await pool.query<RowDataPacket[]>(
				`SELECT
		              t.id,
		              CONCAT(u.first_name, ' ', u.last_name) AS requester,
					  u.email AS email,
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
		              t.requester_id = u.id;`
			)

			const sortResult = result.sort((a, b) => {
				const timestampA = new Date(a.last_message).getTime();
				const timestampB = new Date(b.last_message).getTime();

				return timestampB - timestampA;
			})

			const formattedRes = sortResult.map((result) => ({
				...result,
				last_message: formatDistanceToNow(result.last_message, {
					addSuffix: true
				})
			}))

			res.json(formattedRes)
		} else if (
			req.session.user_authorization === 1
		) {
			const query = `
					SELECT
						t.id,
						CONCAT(u.first_name, ' ', u.last_name) AS requester,
						u.email AS email,
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
						t.requester_id = u.id
					WHERE
						u.id = ?;
					`
			const userId = req.session.user_id
			const [result] = await pool.query<RowDataPacket[]>(query, [userId])
			const sortResult = result.sort((a, b) => {
				const timestampA = new Date(a.last_message).getTime();
				const timestampB = new Date(b.last_message).getTime();

				return timestampB - timestampA;
			})

			const formattedRes = sortResult.map((result) => ({
				...result,
				last_message: formatDistanceToNow(result.last_message, {
					addSuffix: true
				})
			}))

			res.json(formattedRes)
		}
	} catch (err) {
		console.error('Error querying MySQL:', err)
		res.status(500).json({ error: 'Database error' })
	}
}

async function createTicket(req: Request, res: Response) {
	try {
		const requester_id = req.session.user_id;
		const formObj = req.body

		await pool.query(`
			INSERT INTO tickets (requester_id, modules, subject, cs, priority) 
			VALUES (?, ?, ?, ?, ?)
		`, [requester_id, formObj.modules, formObj.subject, formObj.cs, formObj.priority])

		res.status(200).json({ msg: 'Create tickets complete' })
	} catch (err) {
		console.log('Update ticket error')
	}
}
