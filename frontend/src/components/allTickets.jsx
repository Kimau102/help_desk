import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  {
    field: 'requester',
    headerName: 'Requester',
    width: 160,
  },
  {
    field: 'modules',
    headerName: 'Modules',
    width: 150,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 150,
  },
  {
    field: 'cs',
    headerName: 'CS',
    width: 150,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'lastMessage',
    headerName: 'Last Message',
    width: 200,
  },
];

export default function DataTable() {
  const [allTickets, setAllTickets] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (await fetch('/tickets')).json()

        const formattedData = res.map(item => ({
          id: item.id,
          requester: item.requester,
          modules: item.modules,
          subject: item.subject,
          cs: item.cs,
          priority: item.priority,
          status: item.status,
          lastMessage: item.last_message
        }))
        setAllTickets(formattedData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  }, [])

  const rows = allTickets.map(ticket => ({
    id: ticket.id,
    requester: ticket.requester,
    modules: ticket.modules,
    subject: ticket.subject,
    cs: ticket.cs,
    priority: ticket.priority,
    status: ticket.status,
    lastMessage: ticket.lastMessage
  }));

  return (
    <div>
      <p>Total {rows.length} Tickets</p>
      <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        checkboxSelection
        disableSelectionOnClick
      />
    </div></div>
    
  );
}