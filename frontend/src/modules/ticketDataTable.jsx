import * as React from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { FilterPriority, FilterModules } from '../components/filter'
import TicketsInsight from './ticketsInsight'
import { Link } from 'react-router-dom'
import LoginPageContainer from './loginPage'
import CircularIndeterminate from '../components/loading'
import { useGuard } from '../components/guard'
import EditIcon from '@mui/icons-material/Edit';

const columns = [
	{
		field: 'requester',
		headerName: 'Requester',
		width: 150
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 200
	},
	// {
	// 	field: 'requesterInfo',
	// 	headerName: 'Requester',
	// 	width: 300,
	// 	valueGetter: (params) => {
	// 		return (
	// 			`${params.row.requester} /n ${params.row.email}`
	// 			);
	// 	}
	// },
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
		width: 150
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 150
	},
	{
		field: 'last_message',
		headerName: 'Last Message',
		width: 200
	},
	{
		field: 'action',
		headerName: 'Action',
		width: 150,
		getActions: () => {
			return [
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					className="textPrimary"
					// onClick={handleEditClick(id)}
					color="inherit"
				/>
			]
		}
	}
]

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

	const { loading, loginStatus, userAuthorization } =
		useGuard()

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
								{userAuthorization === 1 &&
									showNewTicketButton && (
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
							pageSize={20}
							checkboxSelection
							disableSelectionOnClick
						/>
					</div>
				</>
			) : (
				<LoginPageContainer />
			)}
		</div>
	)
}
