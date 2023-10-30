import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	await knex('tickets').del()
	await knex('users').del()

	await knex('users').insert([
		{
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
			password: 'password123',
			cs_authorization: true,
			user_authorization: false,
			address: '123 Main St'
		},
		{
			first_name: 'Jane',
			last_name: 'Smith',
			email: 'jane@example.com',
			password: 'securepass',
			cs_authorization: false,
			user_authorization: true,
			address: '456 Elm St'
		},
		{
			first_name: 'Michael',
			last_name: 'Johnson',
			email: 'michael@example.com',
			password: 'pass123',
			cs_authorization: true,
			user_authorization: false,
			address: '789 Oak St'
		},
		{
			first_name: 'Sarah',
			last_name: 'Brown',
			email: 'sarah@example.com',
			password: 'mysecret',
			cs_authorization: false,
			user_authorization: true,
			address: '101 Maple St'
		},
		{
			first_name: 'David',
			last_name: 'Wilson',
			email: 'david@example.com',
			password: 'secret123',
			cs_authorization: true,
			user_authorization: false,
			address: '202 Pine St'
		},
		{
			first_name: 'Au',
			last_name: 'Kim',
			email: 'kimau@example.com',
			password: '12345678',
			cs_authorization: true,
			user_authorization: true,
			address: 'HK'
		}
	])

	await knex('tickets').del()
	const dataToInsert = []
	const numRows = 100

	for (let i = 0; i < numRows; i++) {
		const requesterId = Math.floor(1 + Math.random() * 5)
		const modules =
			Math.floor(Math.random() * 3) === 0
				? 'Booking'
				: Math.floor(Math.random() * 3) === 1
				? 'Charging'
				: 'Module C'
		const subject =
			Math.floor(Math.random() * 9) === 0
				? 'Issue 1'
				: Math.floor(Math.random() * 9) === 1
				? 'Issue 2'
				: Math.floor(Math.random() * 9) === 2
				? 'Issue 3'
				: Math.floor(Math.random() * 9) === 3
				? 'Issue 4'
				: Math.floor(Math.random() * 9) === 4
				? 'Issue 5'
				: Math.floor(Math.random() * 9) === 5
				? 'Issue 6'
				: Math.floor(Math.random() * 9) === 6
				? 'Issue 7'
				: Math.floor(Math.random() * 9) === 7
				? 'Issue 8'
				: 'Issue 9'
		const cs =
			Math.floor(Math.random() * 5) === 0
				? 'CS 1'
				: Math.floor(Math.random() * 5) === 1
				? 'CS 2'
				: Math.floor(Math.random() * 5) === 2
				? 'CS 3'
				: Math.floor(Math.random() * 5) === 3
				? 'CS 4'
				: 'CS 5'
		const priority =
			Math.floor(Math.random() * 4) === 0
				? 'Urgent'
				: Math.floor(Math.random() * 4) === 1
				? 'High'
				: Math.floor(Math.random() * 4) === 2
				? 'Medium'
				: 'Low'
		const status =
			Math.floor(Math.random() * 6) === 0
				? 'Open'
				: Math.floor(Math.random() * 6) === 1
				? 'Processing'
				: Math.floor(Math.random() * 6) === 2
				? 'Pending'
				: Math.floor(Math.random() * 6) === 3
				? 'On Hold'
				: Math.floor(Math.random() * 6) === 4
				? 'Solve'
				: 'Closed'

		dataToInsert.push({
			requester_id: requesterId,
			modules,
			subject,
			cs,
			priority,
			status,
			last_message: knex.fn.now()
		})
	}
	await knex('tickets').insert(dataToInsert)
}
