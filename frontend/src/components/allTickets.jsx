import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  {
    field: 'requester',
    headerName: 'Requester',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 150 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'modules',
    headerName: 'Mdules',
    width: 150,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 150,
  },
  {
    field: 'cs',
    headerName: 'CS',
    width: 150,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'lastMessage',
    headerName: 'Last Message',
    width: 180,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', modules: 'Module A', subject: 'Issue 1', cs : 'Customer support needed', priority: 'High', status: 'Open', lastMessage: '12:00:00'},
  { id: 2, lastName: 'Snow', firstName: 'Jon', modules: 'Module A', subject: 'Issue 1', cs : 'Customer support needed', priority: 'High', status: 'Open', lastMessage: '12:00:00'},
  { id: 3, lastName: 'Snow', firstName: 'Jon', modules: 'Module A', subject: 'Issue 1', cs : 'Customer support needed', priority: 'High', status: 'Open', lastMessage: '12:00:00'},
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
];

export default function DataTable() {
  (async () => {
    const resMsg = await fetch('/allTickets');
    console.log(resMsg.json());
  })();
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}