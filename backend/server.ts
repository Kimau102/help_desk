import express from 'express'
import session from 'express-session'
import { ticketsRoutes } from './routes/ticketsRoutes'
import { userRoutes } from './routes/usersRoutes'
import { sessionSecret } from './util'
import { isLoggedInAPI } from './guard'

const app = express()

app.use(
	session({
		secret: sessionSecret,
		resave: true,
		saveUninitialized: true
	})
)
declare module 'express-session' {
	interface SessionData {
		user_email?: string
		user_id: number
		user_authorization: number
		cs_authorization: number
	}
}
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/tickets', isLoggedInAPI, ticketsRoutes)

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
