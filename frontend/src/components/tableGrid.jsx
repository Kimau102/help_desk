import React, { useState } from 'react'
import TablePagination from '@mui/material/TablePagination'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TicketAction } from '../modules/ticketAction'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useGuard } from '../components/guard'
// import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TableGrid({
	rows
}) {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const { loginStatus } = useGuard()

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const [ticketID, setTicketID] = React.useState(null)
	const [ticketInfo, setTicketInfo] = React.useState('')

	const handleEditButton = (ticketID) => {
		setTicketID(ticketID)
	}

	React.useEffect(() => {
		if (loginStatus === true) {
			; (async () => {
				const res = await (await fetch('/api/tickets')).json()
				const selectedTicket = res.find(
					(ticket) => ticket.id === ticketID
				)
				if (selectedTicket) {
					setTicketInfo(selectedTicket)
				}
			})()
		}
	}, [loginStatus, ticketID])

	// ------------------------------Columns--------------------------------
	const columns = [
		{
			field: 'requesterInfo',
			headerName: 'Requester',
			width: 250,
			renderCell: (params) => {
				const name = params.row.requester
				const initials = name
					.split(' ')
					.map((word) => word[0])
					.join('')
				return (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Stack padding={2}>
							<Avatar>{initials}</Avatar>
						</Stack>
						<div>
							<Typography>{params.row.requester}</Typography>
							<Typography>{params.row.email}</Typography>
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
				let chipColor = 'default'
				switch (params.row.priority) {
					case 'Urgent':
						chipColor = 'primary'
						break
					case 'High':
						chipColor = 'secondary'
						break
					case 'Medium':
						chipColor = 'warning'
						break
					case 'Low':
						chipColor = 'success'
						break
					default:
						chipColor = 'default'
						break
				}
				return (
					<Stack direction='row' spacing={1}>
						<Chip
							label={params.row.priority}
							variant='outlined'
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
					<Stack direction='row' spacing={1}>
						<Chip label={params.row.status} variant='outlined' />
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
					<div onClick={() => handleEditButton(params.row.id)}>
						<TicketAction ticketInfo={ticketInfo} />
					</div>
				)
			}
		}
	]


	const [selectedRows, setSelectedRows] = React.useState([]);

	const handleCheckboxChange = (event, rowId) => {
		if (event.target.checked) {
			setSelectedRows([...selectedRows, rowId]);
		} else {
			setSelectedRows(selectedRows.filter((id) => id !== rowId));
		}
	};

	const isAllSelected = selectedRows.length === rows.length;

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			setSelectedRows(rows.map((row) => row.id));
		} else {
			setSelectedRows([]);
		}
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									checked={isAllSelected}
									onChange={handleSelectAll}
								/>
							</TableCell>
							{columns.map((column) => (
								<TableCell key={column.field}>
									{column.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow key={row.id}>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedRows.includes(row.id)}
											onChange={(event) => handleCheckboxChange(event, row.id)}
										/>
									</TableCell>
									{columns.map((column, columnIndex) => {
										// console.log(row.id)
										return (
											<TableCell key={column.field}>
												{column.renderCell
													? column.renderCell({
														row: row,
														value: row[column.field],
														field: column.field,
														columnIndex: columnIndex,
													})
													: row[column.field]}
											</TableCell>
										)
									})}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 20, 50]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	)
}
