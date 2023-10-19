import express, { Request, Response } from 'express'
import { pool } from '../util'
import { RowDataPacket } from 'mysql2'

export const loginRoutes = express.Router()

loginRoutes.post('/', loginAC)

async function loginAC(req: Request, res: Response) {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			`SELECT users.id,
            users.email,
            users.password,
            users.admin_authorization,
            users. client_authorization from users where users.email = ?`,
			[req.body.email]
		)

		if (result.length > 0) {
			const checkLogin = result.some(
				(user) => user.password === req.body.password
			)
			if (checkLogin === true) {
				req.session.user_email = req.body.email
				res.status(200).json({
					user_id: result[0].id,
					email: result[0].email,
					admin_authorization: result[0].admin_authorization,
					client_authorization: result[0].client_authorization
				})
			} else {
				res.status(400).json({ msg: 'login failure' })
			}
		} else {
			res.status(400).json({ msg: 'login failure' })
		}
	} catch (err) {
		console.error('Error querying MySQL:', err)
		res.status(500).json({ error: 'Database error' })
	}
}
