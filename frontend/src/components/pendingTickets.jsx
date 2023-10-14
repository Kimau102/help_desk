import * as React from 'react';
import { TicketDataTable } from './filterStatusTickets';

export default function PendingDataTable() {
    return (
        <TicketDataTable status = 'Pending' />
    );
}