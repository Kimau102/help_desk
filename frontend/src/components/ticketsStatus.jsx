import * as React from 'react';
import Box from '@mui/material/Box';

export default function TicketsInsight() {

    const [ticketsStatus, setTicketStatus] = React.useState('')
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await (await fetch('/tickets')).json()
                const StatusSets = new Set()
                res.forEach(item => {
                    StatusSets.add(item.status)
                })
                setTicketStatus(StatusSets)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h3>All Tickets Insight</h3>
            <div style={{ display: 'flex' }}>
                {Array.from(ticketsStatus).map(status => (
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            m: 2,
                            p: 2,
                            minWidth: 200,
                        }}
                    >
                        <Box sx={{ color: 'text.secondary' }}>{status}</Box>
                        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                            {status.length}
                        </Box>
                    </Box>
                ))}

            </div>
        </div>
    )
}