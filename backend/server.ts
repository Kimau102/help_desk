import express from 'express';
import session from 'express-session';
import { ticketsRoutes } from './routes/ticketsRoutes';
import { loginRoutes } from './routes/usersRoutes';
import { pool, sessionSecret } from './util'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	session({
		secret: sessionSecret,
		resave: true,
		saveUninitialized: true
	})
);

declare module 'express-session' {
	interface SessionData {
		user_email?: string
	}
}

app.get('/checkIsLogin', async (req, res) => {
	if (req.session.user_email) {
		const [userInfo] = await pool.query(
			`SELECT users.id,
			users.first_name,
			users.last_name,
			users.email,
			users.admin_authorization,
			users.client_authorization,
			users.address from users where users.email = ?`,
			[req.session.user_email])
		res.json({
			login_status: true,
			user_id: userInfo[0].id,
			user_first_name: userInfo[0].first_name,
			user_last_name: userInfo[0].last_name,
			email: userInfo[0].email,
			admin_authorization: userInfo[0].admin_authorization,
			client_authorization: userInfo[0].client_authorization,
			address: userInfo[0].address,
		});
	} else {
		res.status(400).json({ msg: 'Not yet login', login_status: false })
	}
})

app.post('/logout', async (req, res) => {
	if (req.session.user_email) {
		req.session.destroy((err) => {
			if (err) {
				console.error('Error destroying session:', err);
				res.status(500).json({ error: 'Logout failed' });
			} else {
				res.status(200).json({ message: 'Logout successful' });
			}
		});
	} else {
		res.json({msg: 'not login yet'})
	}
});

app.use('/tickets', ticketsRoutes)
app.use('/login', loginRoutes)

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
