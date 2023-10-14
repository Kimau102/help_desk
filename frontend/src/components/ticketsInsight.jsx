import * as React from 'react';
import Box from '@mui/material/Box';

export default function TicketsInsight() {

    const [ticketsStatus, setTicketStatus] = React.useState([]);
    const [ticketsStatusLength, setTicketsStatusLength] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await (await fetch('/tickets')).json();
                const statusSets = new Set();
                res.forEach(item => {
                    statusSets.add(item.status);
                });
                setTicketStatus(Array.from(statusSets));

                const statusLengths = {};
                Array.from(statusSets).forEach(status => {
                    statusLengths[status] = res.filter(item => item.status === status).length;
                });
                setTicketsStatusLength(statusLengths);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h3>All Tickets Insight</h3>
            <div style={{ display: 'flex', width: '100%' }}>
                {ticketsStatus.map(status => (
                    <Box
                        key={status}
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            m: 2,
                            p: 2,
                            minWidth: 150,
                        }}
                    >
                        <Box sx={{ color: 'text.secondary' }}>{status}</Box>
                        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                            {ticketsStatusLength[status]}
                        </Box>
                    </Box>
                ))}

            </div>
        </div>
    );
}
