import React from 'react';
import { TicketDataTable } from './filterStatusTickets';

export default function AllDataTable() {
  return (
    <TicketDataTable status='All' showNewTicketButton = {true} showTicketsInsight = {true} />
  );
}