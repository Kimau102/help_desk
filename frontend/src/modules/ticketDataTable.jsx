import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { FilterPriority, FilterModules } from '../components/filter'
import TicketsInsight from './ticketsInsight'
import { Link } from 'react-router-dom'
import LoginPageContainer from './loginPage'
import CircularIndeterminate from '../components/loading'
import { useGuard } from '../components/guard'
import { TicketAction } from './ticketAction'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export function TicketDataTable({
	status,
	defaultPriority,
	defaultModules,
	showNewTicketButton,
	showTicketsInsight
}) {

	const [tickets, setTickets] = React.useState([])
	const [selectPriority, setSelectPriority] = React.useState(
		defaultPriority || ''
	)
	const [selectModules, setSelectModules] = React.useState(
		defaultModules || ''
	)

	const { loading, loginStatus, csAuthorization } = useGuard()

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				if (loginStatus === true) {
					const res = await (await fetch('/api/tickets')).json()
					const filteredTickets =
						status === 'All'
							? res
							: res.filter((item) => item.status === status)
					setTickets(filteredTickets)
				}
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [loginStatus, status])

	const handlePriorityChange = (event) => {
		setSelectPriority(event.target.value)
	}

	const handleModuleChange = (event) => {
		setSelectModules(event.target.value)
	}

	const filteredRows = tickets.filter((ticket) => {
		const isPriorityAll = selectPriority === '' || selectPriority === 'All'
		const isModulesAll = selectModules === '' || selectModules === 'All'

		return (
			(isPriorityAll || selectPriority === ticket.priority) &&
			(isModulesAll || selectModules === ticket.modules)
		)
	})

	const [ticketID, setTicketID] = React.useState(null)
	const [ticketInfo, setTicketInfo] = React.useState('')

	const handleEditButton = (ticketID) => {
		setTicketID(ticketID);
	}

	React.useEffect(() => {
		if (loginStatus === true) {
			(async () => {
				const res = await (await fetch('/api/tickets')).json();
				const selectedTicket = res.find((ticket) => ticket.id === ticketID);
				if (selectedTicket) {
					setTicketInfo(selectedTicket);
				}
			})();
		}
	}, [loginStatus, ticketID]);

	const columns = [
		{
			field: 'requesterInfo',
			headerName: 'Requester',
			width: 250,
			renderCell: (params) => {
				const name = params.row.requester; 
				const initials = name
					.split(' ')
					.map((word) => word[0])
					.join('');
				return (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Stack padding={2}>
							<Avatar>{initials}</Avatar>
						</Stack>
						<div>
							<Typography>
								{params.row.requester}
							</Typography>
							<Typography>
								{params.row.email}
							</Typography>
						</div>
					</div>
				)
			}
		},
		{
			field: 'modules',
			headerName: 'Modules',
			width: 150
		},
		{
			field: 'subject',
			headerName: 'Subject',
			width: 150
		},
		{
			field: 'cs',
			headerName: 'CS',
			width: 150
		},
		{
			field: 'priority',
			headerName: 'Priority',
			width: 150,
			renderCell: (params) => {
				let chipColor = 'default';
				switch (params.row.priority) {
					case 'Urgent':
						chipColor = 'primary';
						break;
					case 'High':
						chipColor = 'secondary';
						break;
					case 'Medium':
						chipColor = 'warning';
						break;
					case 'Low':
						chipColor = 'success';
						break;
					default:
						chipColor = 'default';
						break;
				}
				return (
					<Stack direction="row" spacing={1}>
						<Chip
							label={params.row.priority}
							variant="outlined"
							color={chipColor}
						/>
					</Stack>
				)
			}
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<Stack direction="row" spacing={1}>
						<Chip
							label={params.row.status}
							variant="outlined"
						/>
					</Stack>
				)
			}
		},
		{
			field: 'last_message',
			headerName: 'Last Message',
			width: 200
		},
		{
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<Button onClick={() => handleEditButton(params.row.id)}>
						<TicketAction ticketInfo={ticketInfo} />
					</Button>
				)
			}
		}
	]

	return (
		<div>
			{loading ? (
				<CircularIndeterminate />
			) : loginStatus ? (
				<>
					<div>
						{showTicketsInsight && <TicketsInsight />}
						<h3>Tickets List</h3>
						<div>
							<div style={{ height: 52, width: '100%' }}>
								{csAuthorization === 1 && showNewTicketButton && (
									<>
										<Link to='./new-ticket'>
											<Button
												variant='contained'
												color='success'
												style={{ margin: 9 }}
											>
												+ New Tickets
											</Button>
										</Link>
									</>
								)}
								<FilterModules
									selectModules={selectModules}
									onModuleChange={handleModuleChange}
								/>
								<FilterPriority
									selectPriority={selectPriority}
									onPriorityChange={handlePriorityChange}
								/>
							</div>
						</div>
					</div>
					<p>Total {filteredRows.length} Tickets</p>
					<div style={{ height: 800, width: '100%' }}>
						<DataGrid
							rows={filteredRows}
							columns={columns}
							checkboxSelection
							disableRowSelectionOnClick
							disableColumnMenu
						/>
					</div>
				</>
			) : (
				<LoginPageContainer />
			)}
		</div>
	)
}
