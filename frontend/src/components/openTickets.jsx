import * as React from 'react';
import { TicketDataTable } from './filterStatusTickets';

export default function OpenDataTable() {
    return (
        <TicketDataTable status="Open" />
    );
}