import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { useGuard } from './guard'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}))

function getInitials(name) {
	const words = name.match(/\b\w/g) || []

	const initials = words.map((word) => word[0])

	return initials.join('').toUpperCase()
}

export default function ImageAvatars() {
	const classes = useStyles()
	const { userName } = useGuard()

	let avatarContent

	if (userName) {
		const initials = getInitials(userName)
		avatarContent = /^[\u4e00-\u9fa5]$/.test(initials)
			? initials
			: initials.slice(0, 2)
	} else {
		avatarContent = ''
	}

	return (
		<div className={classes.root}>
			<Avatar alt={userName} src={userName}>
				{' '}
				{avatarContent}{' '}
			</Avatar>
		</div>
	)
}
