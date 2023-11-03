import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { socket } from '../socket';
import { useGuard } from './guard';

export default function NewTicketAlert() {
  const [newTicketAlert, setNewTicketAlert] = useState(false);
  const { csAuthorization } = useGuard();

  useEffect(() => {
    // socket.connect();
    socket.on('new-ticket', (data) => {
      setNewTicketAlert(true);

      setTimeout(() => {
        setNewTicketAlert(false);
      }, 5000);
    });
    return () => {
      socket.off('new-ticket');
      // socket.disconnect();
    };
  }, []);

  return (
    <>
      {newTicketAlert && csAuthorization ===1 && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="info">
            Notification: a new ticket has been posted!!
          </Alert>
        </Stack>
      )}
    </>
  );
}