import * as React from 'react'
import TableGrid from '../components/tableGrid'
import Button from '@mui/material/Button'
import { FilterPriority, FilterModules } from '../components/filter'
import TicketsInsight from './ticketsInsight'
import { Link } from 'react-router-dom'
import LoginPageContainer from './loginPage'
import CircularIndeterminate from '../components/loading'
import { useGuard } from '../components/guard'

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

	const { loading, loginStatus } = useGuard()

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
								{showNewTicketButton && (
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
						<TableGrid rows={filteredRows} />
					</div>
				</>
			) : (
				<LoginPageContainer />
			)}
		</div>
	)
}
