import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function NewTicketComponent(onFormSubmit) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		modules: '',
		subject: '',
		cs: '',
		priority: 'All Priority',
		status: ''
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(formData)
	}

	return (
		<div>
			<h1>Create New Ticket</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					name='firstName'
					label='First Name'
					value={formData.firstName}
					onChange={handleInputChange}
					fullWidth
				/>
				<TextField
					name='lastName'
					label='Last Name'
					value={formData.lastName}
					onChange={handleInputChange}
					fullWidth
				/>
				<TextField
					name='modules'
					label='Modules'
					value={formData.modules}
					onChange={handleInputChange}
					fullWidth
				/>
				<TextField
					name='subject'
					label='Subject'
					value={formData.subject}
					onChange={handleInputChange}
					fullWidth
				/>
				<TextField
					name='cs'
					label='CS'
					value={formData.cs}
					onChange={handleInputChange}
					fullWidth
				/>
				<div style={{ display: 'flex' }}>
					<Select
						name='priority'
						label='Priority'
						value={formData.priority}
						onChange={handleInputChange}
						style={{ flex: 1 }}
					>
						<MenuItem value='All Priority'>All Priority</MenuItem>
						<MenuItem value='Urgent'>Urgent</MenuItem>
						<MenuItem value='High'>High</MenuItem>
						<MenuItem value='Medium'>Medium</MenuItem>
						<MenuItem value='Low'>Low</MenuItem>
					</Select>
				</div>
				<TextField
					name='status'
					label='Status'
					value={formData.status}
					onChange={handleInputChange}
					fullWidth
				/>
				<Button type='submit' variant='contained' color='primary'>
					Submit
				</Button>
			</form>
			<Link to='/all-tickets'>
				<Button variant='contained' color='primary'>
					Back
				</Button>
			</Link>
		</div>
	)
}

export default NewTicketComponent
