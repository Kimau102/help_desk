import express, { Request, Response } from 'express'
import { formatDistanceToNow } from 'date-fns'
import { knex } from '../util'

export const ticketsRoutes = express.Router()

ticketsRoutes.get('/', getAllTickets)
ticketsRoutes.post('/', createTicket)
ticketsRoutes.put('/', editTicket)
ticketsRoutes.delete('/', deleteTicket)

async function getAllTickets(req: Request, res: Response) {
	try {
		if (req.session.cs_authorization === 1) {
			const results = await knex('tickets as t')
				.select([
					't.id',
					knex.raw(
						"CONCAT(u.first_name, ' ', u.last_name) AS requester"
					),
					'u.email AS email',
					't.modules',
					't.subject',
					't.cs',
					't.priority',
					't.status',
					't.last_message',
					't.created_at'
				])
				.innerJoin('users as u', 't.requester_id', 'u.id')
				.orderBy('t.last_message', 'desc')

			const formattedRes = results.map((result) => ({
				...result,
				last_message: formatDistanceToNow(result.last_message, {
					addSuffix: true
				}),
				created_at: new Date(result.created_at).toLocaleDateString()
			}))

			res.json(formattedRes)
		} else if (req.session.user_authorization === 1) {
			const userId = req.session.user_id

			const results = await knex('tickets as t')
				.select([
					't.id',
					knex.raw(
						"CONCAT(u.first_name, ' ', u.last_name) AS requester"
					),
					'u.email AS email',
					't.modules',
					't.subject',
					't.cs',
					't.priority',
					't.status',
					't.last_message',
					't.created_at'
				])
				.innerJoin('users as u', 't.requester_id', 'u.id')
				.where('u.id', userId)
				.orderBy('t.last_message', 'desc')

			const formattedRes = results.map((result) => ({
				...result,
				last_message: formatDistanceToNow(result.last_message, {
					addSuffix: true
				}),
				created_at: new Date(result.created_at).toLocaleDateString()
			}))

			res.json(formattedRes)
		}
	} catch (err) {
		console.error('Error querying the database:', err)
		res.status(500).json({ error: 'Database error' })
	}
}

async function createTicket(req: Request, res: Response) {
	try {
		const requester_id = req.session.user_id
		const formObj = req.body

		await knex
			.insert([
				{
					requester_id: requester_id,
					modules: formObj.modules,
					subject: formObj.subject,
					cs: formObj.cs,
					priority: formObj.priority,
					status: formObj.status
				}
			])
			.into('tickets')

		res.status(200).json({ msg: 'Create tickets complete' })
	} catch (err) {
		console.log('Update ticket error')
	}
}

async function editTicket(req: Request, res: Response) {
	try {
		const ticketID = req.body.id
		const ticketStatus = req.body.status

		await knex('tickets').where('id', '=', ticketID).update(
			{
				status: ticketStatus,
				last_message: knex.raw('CURRENT_TIMESTAMP'),
				updated_at: knex.raw('CURRENT_TIMESTAMP')
			}
		)
		res.status(200).json({msg: 'Update ticket success'})
	} catch(e) {
		console.log(e)
		res.status(400).json({msg: 'Update ticket failure'})
	}
}

async function deleteTicket(req: Request, res: Response) {
	try{
		const ticketID = req.body.id
		console.log(ticketID)
		await knex('tickets').where('id', '=', ticketID).del()
		res.status(200).json({msg: 'Delete ticket success'})
	} catch(e) {
		console.log(e)
		res.status(400).json({msg: 'Delete ticket failure'})
	}
}