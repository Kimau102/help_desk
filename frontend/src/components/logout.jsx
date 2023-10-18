import { Button } from '@mui/material';

export default function HandleLogout() {
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
  return (
    <Button>Logout</Button>
  )
}