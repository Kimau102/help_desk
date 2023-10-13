import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@mui/material/Button';
import { columns, FilterPriority, FilterModules } from '../modules/filter';
import TicketsInsight from './ticketsStatus';

export default function AllDataTable() {
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
    const isPriorityAll = selectPriority === '' || selectPriority === 'All';
    const isModulesAll = selectModules === '' || selectModules === 'All';
  
    return (isPriorityAll || selectPriority === ticket.priority) && (isModulesAll || selectModules === ticket.modules);
  });
  
  return (
    <div>
      <div>
        <TicketsInsight />
        <h3>Tickets List</h3>
        <div>
          <div style={{ height: 52, width: '100%' }}>
            <Button variant="contained" color="success" style={{ margin: 9 }}>
              + New Tickets
            </Button>
            <FilterModules selectModules={selectModules} onModuleChange={handleModuleChange} />
            <FilterPriority selectPriority={selectPriority} onPriorityChange={handlePriorityChange} />
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
      </div></div>

  );
}