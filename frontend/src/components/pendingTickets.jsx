import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { columns, FilterPriority, FilterModules } from '../modules/filter';

export default function PendingDataTable() {
    const [pendingTickets, setPendingTickets] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await (await fetch('/tickets')).json()
                const mapPendingTickets = res.filter(item => { return item.status === 'Pending' })
                setPendingTickets(mapPendingTickets)
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

    const filteredRows = pendingTickets.filter(function (ticket) {
        const isPriorityAll = selectPriority === '' || selectPriority === 'All';
        const isModulesAll = selectModules === '' || selectModules === 'All';

        return (isPriorityAll || selectPriority === ticket.priority) && (isModulesAll || selectModules === ticket.modules);
    });

    return (
        <div>
            <div>
                <h3>Tickets List</h3>
                <div>
                    <div style={{ height: 52, width: '100%' }}>
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