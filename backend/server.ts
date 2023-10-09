import express, { Request, Response } from 'express';
import { connection } from '../backend/util';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/allTickets', async (req: Request, res: Response) => {
	connection.query('SELECT * FROM tickets', (err, results) => {
		if (err) {
		  console.error('Error querying MySQL:', err);
		  return;
		}
		res.json({ msg: 'ok'})
		console.log('Query results:', results);
	  });
	
	//   connection.end();
})

const PORT = 8080
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})
