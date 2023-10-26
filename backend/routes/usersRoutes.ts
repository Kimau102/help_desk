import express, { Request, Response } from 'express'
import { knex } from '../util'

export const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/logout', logout)
userRoutes.get('/session', getSession)

async function login(req: Request, res: Response) {
	try {
		const email = req.body.email
		const password = req.body.password

		const [user] = await knex
			.select([
				'id',
				'email',
				'password',
				'admin_authorization',
				'user_authorization'
			])
			.from('users')
			.where({ email })

		if (user && user.password === password) {
			req.session.user_id = user.id
			req.session.user_email = user.email
			req.session.user_authorization = user.user_authorization
			req.session.admin_authorization = user.admin_authorization

			res.status(200).json({
				user_id: user.id,
				email: user.email,
				admin_authorization: user.admin_authorization,
				user_authorization: user.user_authorization
			})
		} else {
			res.status(400).json({ msg: 'Login failure' })
		}
	} catch (err) {
		console.error('Error querying the database:', err)
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
		res.json({ msg: 'Not logged in yet' })
	}
}

async function getSession(req: Request, res: Response) {
	try {
		if (req.session?.user_email) {
			const [userInfo] = await knex
				.select([
					'id',
					'first_name',
					'last_name',
					'email',
					'admin_authorization',
					'user_authorization',
					'address'
				])
				.from('users')
				.where({ email: req.session.user_email })

			res.status(200).json({
				login_status: true,
				user_id: userInfo.id,
				user_first_name: userInfo.first_name,
				user_last_name: userInfo.last_name,
				email: userInfo.email,
				admin_authorization: userInfo.admin_authorization,
				user_authorization: userInfo.user_authorization,
				address: userInfo.address
			})
		} else {
			res.status(401).json({
				msg: 'No authorization',
				login_status: false
			})
		}
	} catch (err) {
		console.log(err)
	}
}
