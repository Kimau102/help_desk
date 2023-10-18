import express from 'express';
import session from 'express-session';
import { ticketsRoutes } from './routes/ticketsRoutes';
import { loginRoutes } from './routes/usersRoutes';
import { sessionSecret } from './util'

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



app.use('/tickets', ticketsRoutes)
app.use('/login', loginRoutes)

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
