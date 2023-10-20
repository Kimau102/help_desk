import express, { Request, Response } from 'express'
import { pool } from '../util'
import { RowDataPacket } from 'mysql2'

export const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/logout', logout)
userRoutes.get('/session', getSession)

async function login(req: Request, res: Response) {
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

async function logout(req: Request, res: Response) {
	if (req.session.user_email) {
		req.session.destroy((err) => {
			if (err) {
				console.error('Error destroying session:', err)
				res.status(500).json({ error: 'Logout failed' })
			} else {
				res.status(200).json({ message: 'Logout successful' })
			}
		})
	} else {
		res.json({ msg: 'not login yet' })
	}
}

async function getSession(req: Request, res: Response) {
	try {
		if (req.session?.user_email) {
			const [userInfo] = await pool.query(
				`SELECT users.id,
			users.first_name,
			users.last_name,
			users.email,
			users.admin_authorization,
			users.client_authorization,
			users.address from users where users.email = ?`,
				[req.session.user_email]
			)
			res.status(200).json({
				login_status: true,
				user_id: userInfo[0].id,
				user_first_name: userInfo[0].first_name,
				user_last_name: userInfo[0].last_name,
				email: userInfo[0].email,
				admin_authorization: userInfo[0].admin_authorization,
				client_authorization: userInfo[0].client_authorization,
				address: userInfo[0].address
			})
		} else {
			res.status(401).json({
				msg: 'No Authorization',
				login_status: false
			})
		}
	} catch (err) {
		console.log(err)
	}
}
