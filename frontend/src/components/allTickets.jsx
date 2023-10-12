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
    field: 'last_message',
    headerName: 'Last Message',
    width: 200,
  },
];

function SelectPriority(props) {
  const { selectPriority, onPriorityChange } = props;

  const [menuItem, setMenuItem] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (await fetch('/tickets')).json()
        const prioritySets = new Set()
        res.forEach(item => {
          prioritySets.add(item.priority)
        })
        setMenuItem(prioritySets)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  }, [])

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">All Priorities</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectPriority}
        label="All Priority"
        onChange={onPriorityChange}
      >
        <MenuItem value={'All'}>All Priority</MenuItem>
        {Array.from(menuItem).map(priority => (
          <MenuItem key={priority} value={priority}>{priority}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectModules(props) {
  const { selectModules, onModuleChange } = props;

  const [menuItem, setMenuItem] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (await fetch('/tickets')).json()
        const moduleSets = new Set()
        res.forEach(item => {
          moduleSets.add(item.modules)
        })
        setMenuItem(moduleSets)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  }, [])

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">All Modules</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectModules}
        label="All Priority"
        onChange={onModuleChange}
      >
        <MenuItem value={'All'}>All Modules</MenuItem>
        {Array.from(menuItem).map(modules => (
          <MenuItem key={modules} value={modules}>{modules}</MenuItem>
        ))}
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
        setAllTickets(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  }, [])

  const [selectPriority, setSelectPriority] = React.useState('');
  const [selectModules, setSelectModules] = React.useState('')
  const handlePriorityChange = (event) => {
    setSelectPriority(event.target.value);
  };
  const handleModuleChange = (event) => {
    setSelectModules(event.target.value);
  };

  const filteredRows = allTickets.filter(function (ticket) {
    if ((selectPriority === '' || selectPriority === 'All') && (selectModules === '' || selectModules === 'All')) {
      return true;
    } 
    else if (selectPriority === ticket.priority || selectModules === ticket.modules) {
      return true;
    }
    // else if (selectPriority === ticket.priority && selectModules === ticket.modules) {
    //   return true;
    // }
    return false;
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
            <SelectModules selectModules={selectModules} onModuleChange={handleModuleChange} />
            <SelectPriority selectPriority={selectPriority} onPriorityChange={handlePriorityChange} />
          </div>
        </div>
      </div>
      <p>Total {allTickets.length} Tickets</p>
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