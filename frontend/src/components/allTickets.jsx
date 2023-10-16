import React from 'react';
import { TicketDataTable } from './ticketDataTable';

export default function AllDataTable() {
  return (
    <TicketDataTable status='All' showNewTicketButton = {true} showTicketsInsight = {true} />
  );
}