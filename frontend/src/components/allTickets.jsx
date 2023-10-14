import React from 'react';
import { TicketDataTable } from './TicketDataTable';

export default function AllDataTable() {
  return (
    <TicketDataTable status='All' showNewTicketButton = {true} showTicketsInsight = {true} />
  );
}