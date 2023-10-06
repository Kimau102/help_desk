import express, { Request, Response } from 'express';
import path from 'path';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req: Request, res: Response) => {
	res.status(404)
	res.sendFile(path.resolve('../frontend/public/404.html'))
})

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
