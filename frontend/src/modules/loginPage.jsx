import React, { useState, useEffect } from 'react'
import { Paper, TextField, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CircularIndeterminate from '../components/loading'
import { useGuard } from '../components/guard'

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
		const res = await fetch('/api/user/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (res.status === 200) {
			window.location.href = '/login'
		}
	}

	const [loginedInfo, setLoginedInfo] = useState('')
	useEffect(() => {
		;(async () => {
			const res = await (await fetch('/api/user/session')).json()
			const userName = res.user_first_name + ' ' + res.user_last_name
			setLoginedInfo(userName)
		})()
	}, [])

	return (
		<div>
			<h1>Hi, {loginedInfo}</h1>
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
		const res = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
		if (res.status === 200) {
			window.location.href = '/login'
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
	const { loading, loginStatus } = useGuard()
	return (
		<div>
			{loading ? (
				<CircularIndeterminate />
			) : loginStatus ? (
				<LoginedPage />
			) : (
				<LoginPage />
			)}
		</div>
	)
}

export default LoginPageContainer
