import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useGuard } from '../components/guard'
import LoginPageContainer from './loginPage'

function NewTicketComponent(onFormSubmit) {
	const { loginStatus, userAuthorization } = useGuard()

	const [formData, setFormData] = useState({
		modules: '',
		subject: '',
		cs: '',
		priority: ''
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (
			formData.modules.trim() === '' ||
			formData.subject.trim() === '' ||
			formData.cs.trim() === '' ||
			formData.priority.trim() === '' ||
			formData.status.trim() === ''
		) {
			alert('Please fill in all fields')
			return
		}

		const res = await fetch('/api/tickets', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
		if (res.status === 200) {
			console.log('Create Ticket Success')
			setFormData({
				modules: '',
				subject: '',
				cs: '',
				priority: ''
			})
		} else {
			console.log('Create Ticket Failure')
		}
	}

	return (
		<div>
			{loginStatus && userAuthorization === 1 ? (
				<>
					<h1>Create New Ticket</h1>
					<form onSubmit={handleSubmit}>
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
								<MenuItem value='Urgent'>Urgent</MenuItem>
								<MenuItem value='High'>High</MenuItem>
								<MenuItem value='Medium'>Medium</MenuItem>
								<MenuItem value='Low'>Low</MenuItem>
							</Select>
						</div>
						<div style={{ display: 'flex' }}>
							<Select
								name='status'
								label='Status'
								value={formData.status}
								onChange={handleInputChange}
								style={{ flex: 1 }}
							>
								<MenuItem value='Open'>Open</MenuItem>
								<MenuItem value='Closed'>Closed</MenuItem>
								<MenuItem value='Pending'>Pending</MenuItem>
								<MenuItem value='On Hold'>On Hold</MenuItem>
								<MenuItem value='Solve'>Solve</MenuItem>
								<MenuItem value='Processing'>
									Processing
								</MenuItem>
							</Select>
						</div>
						<Button
							type='submit'
							variant='contained'
							color='primary'
						>
							Submit
						</Button>
					</form>
					<Link to='/all-tickets'>
						<Button variant='contained' color='primary'>
							Back
						</Button>
					</Link>
				</>
			) : (
				<LoginPageContainer />
			)}
		</div>
	)
}

export default NewTicketComponent
