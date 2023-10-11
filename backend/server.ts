import express from 'express'
import { ticketsRoutes } from './routes/ticketsRoutes'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/tickets', ticketsRoutes)

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
