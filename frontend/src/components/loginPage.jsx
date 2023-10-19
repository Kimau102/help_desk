import React, { useState, useEffect } from 'react'
import { Paper, TextField, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		height: '200px'
	},
	formContainer: {
		width: '100%'
	}
}))

function LoginedPage() {
	const handleLogout = async (event) => {
		event.preventDefault()
		const res = await fetch('/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (res.status === 200) {
			window.location.href = '/login'
		}
	}

	const [loginedInfo, setLoginedInfo] = useState([])

	useEffect(() => {
		;(async () => {
			const res = await (await fetch('/checkIsLogin')).json()
			setLoginedInfo(res)
		})()
	}, [])
	return (
		<div>
			<h1>
				Hi, {loginedInfo.user_first_name} {loginedInfo.user_last_name}
			</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	)
}

function LoginPage() {
	const classes = useStyles()
	const [formData, setFormData] = useState({
		email: '',
		password: ''
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
		console.log('Form data submitted:', formData)
		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
		if (res.status === 200) {
			window.location.href = '/login'
			console.log('login success')
		} else {
			console.log('login failure')
		}
		setFormData({
			email: '',
			password: ''
		})
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.formContainer}>
				<Typography variant='h5' align='center' gutterBottom>
					Login
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label='Email'
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						variant='outlined'
						fullWidth
					/>
					<TextField
						label='Password'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						variant='outlined'
						fullWidth
					/>
					<Button
						variant='contained'
						color='primary'
						type='submit'
						fullWidth
					>
						Login
					</Button>
				</form>
			</Paper>
		</div>
	)
}

function LoginPageContainer() {
	const [loginStatus, setLoginStatus] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			const res = await (await fetch('/checkIsLogin')).json()
			if (res.login_status === true) {
				setLoginStatus(true)
			}
			setLoading(false)
		})()
	}, [])

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : loginStatus ? (
				<LoginedPage />
			) : (
				<LoginPage />
			)}
		</div>
	)
}

export default LoginPageContainer
