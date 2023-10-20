import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { TicketDataTable } from './ticketDataTable'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NewTicketComponent from './newTicketPage'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import LoginPageContainer from './loginPage'
import ImageAvatars from '../components/avatars'
import { useGuard } from '../components/guard'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerColor: {
		backgroundColor: 'white'
	},
	listItemText: {
		color: 'white'
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: '100%',
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: 'rgb(66, 73, 100)',
		marginTop: `65px`
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}))

function DrawerBar(props) {
	const { window } = props
	const classes = useStyles()
	const theme = useTheme()
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [selectedOption, setSelectedOption] = React.useState('')
	const { loginStatus } = useGuard()

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const handleOptionClick = (option) => {
		setSelectedOption(option)
	}

	const drawer = (
		<div>
			<Divider />
			<List>
				{['All Tickets', 'Open', 'Pending', 'On Hold', 'Solved'].map(
					(text, index) => (
						<Link
							to={'/' + text.toLowerCase().replace(/ /g, '-')}
							style={{ textDecoration: 'none' }}
						>
							<ListItem
								button
								key={text}
								onClick={() => handleOptionClick(text)}
								selected={selectedOption === text}
							>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)}
								</ListItemIcon>
								<ListItemText
									primary={text}
									className={classes.listItemText}
								/>
							</ListItem>
						</Link>
					)
				)}
			</List>
			<Divider />
			<List>
				{['Knowledge', 'Analysis/Statistic', 'Administration'].map(
					(text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								className={classes.listItemText}
							/>
						</ListItem>
					)
				)}
			</List>
		</div>
	)

	const container =
		window !== undefined ? () => window().document.body : undefined

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Router>
				<AppBar
					position='fixed'
					className={`${classes.appBar} ${classes.drawerColor}`}
				>
					<Toolbar
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								edge='start'
								onClick={handleDrawerToggle}
								className={classes.menuButton}
							>
								<MenuIcon
									style={{ color: 'rgb(66, 73, 100)' }}
								/>
							</IconButton>
							<Typography
								variant='h6'
								noWrap
								style={{ color: 'rgb(66, 73, 100)' }}
							>
								Help Desk
							</Typography>
						</div>
						<Link
							to='/login'
							style={{
								textDecoration: 'none',
								color: 'rgb(66, 73, 100)'
							}}
						>
							{loginStatus ? <ImageAvatars /> : <ExitToAppIcon />}
						</Link>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label='mailbox folders'>
					<Hidden smUp implementation='css'>
						<Drawer
							container={container}
							variant='temporary'
							anchor={
								theme.direction === 'rtl' ? 'right' : 'left'
							}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant='permanent'
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main id='drawerContentContainer' className={classes.content}>
					<div className={classes.toolbar} />
					<Routes>
						<Route
							path='/all-tickets'
							element={
								<TicketDataTable
									status='All'
									showNewTicketButton={true}
									showTicketsInsight={true}
								/>
							}
						/>
						<Route
							path='/all-tickets/new-ticket'
							element={<NewTicketComponent />}
						/>
						<Route
							path='/open'
							element={<TicketDataTable status='Open' />}
						/>
						<Route
							path='/pending'
							element={<TicketDataTable status='Pending' />}
						/>
						<Route
							path='/on-hold'
							element={<TicketDataTable status='On Hold' />}
						/>
						<Route
							path='/solved'
							element={<TicketDataTable status='Solve' />}
						/>
						<Route path='/login' element={<LoginPageContainer />} />
						<Route path='/' element={<LoginPageContainer />} />
					</Routes>
				</main>
			</Router>
		</div>
	)
}

export default DrawerBar
