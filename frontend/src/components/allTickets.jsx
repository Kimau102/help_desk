import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

function SelectStatus(props) {
  const { selectPriority, onPriorityChange } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">All Priority</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectPriority}
        label="All Priority"
        onChange={onPriorityChange}
      >
        <MenuItem value={'All'}>All Status</MenuItem>
        <MenuItem value={'Urgent'}>Urgent</MenuItem>
        <MenuItem value={'High'}>High</MenuItem>
        <MenuItem value={'Medium'}>Medium</MenuItem>
        <MenuItem value={'Low'}>Low</MenuItem>
      </Select>
    </FormControl>
  );
}

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

  const [selectPriority, setSelectPriority] = React.useState('');
  const handlePriorityChange = (event) => {
    setSelectPriority(event.target.value);
  };

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
  
  const filteredRows = rows.filter(function(ticket) {
    if (selectPriority === '') {
      return rows
    } else if(selectPriority === 'All') {
      return rows
    } else {
      return ticket.priority === selectPriority;
    }
  });

  return (
    <div>
      <div>
        <h3>Tickets List</h3>
        <div>
          <div style={{ height: 52, width: '100%' }}>
            <Button variant="contained" color="success" style={{ margin: 9 }}>
              + New Tickets
            </Button>
            <SelectStatus selectPriority={selectPriority} onPriorityChange={handlePriorityChange} />
          </div>
        </div>
      </div>
      <p>Total {rows.length} Tickets</p>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={20}
          checkboxSelection
          disableSelectionOnClick
        />
      </div></div>

  );
}