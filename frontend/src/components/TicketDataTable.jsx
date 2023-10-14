import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@mui/material/Button';
import { columns, FilterPriority, FilterModules } from '../modules/filter';
import TicketsInsight from './ticketsInsight';

export function TicketDataTable({ status, defaultPriority, defaultModules, showNewTicketButton, showTicketsInsight }) {
    const [tickets, setTickets] = React.useState([]);
    const [selectPriority, setSelectPriority] = React.useState(defaultPriority || '');
    const [selectModules, setSelectModules] = React.useState(defaultModules || '');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await (await fetch('/tickets')).json();
                const filteredTickets = status === 'All' ? res : res.filter((item) => item.status === status);
                setTickets(filteredTickets);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [status]);

    const handlePriorityChange = (event) => {
        setSelectPriority(event.target.value);
    };

    const handleModuleChange = (event) => {
        setSelectModules(event.target.value);
    };

    const filteredRows = tickets.filter((ticket) => {
        const isPriorityAll = selectPriority === '' || selectPriority === 'All';
        const isModulesAll = selectModules === '' || selectModules === 'All';

        return (isPriorityAll || selectPriority === ticket.priority) && (isModulesAll || selectModules === ticket.modules);
    });

    return (
        <div>
            <div>
                {showTicketsInsight && <TicketsInsight />}
                <h3>Tickets List</h3>
                <div>
                    <div style={{ height: 52, width: '100%' }}>
                        {showNewTicketButton && (
                            <Button variant="contained" color="success" style={{ margin: 9 }}>
                                + New Tickets
                            </Button>
                        )}
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
            </div>
        </div>
    );
}