import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function StatusSelectOptionChip() {

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="status"
        onClick={handleClick}
        Icon={<ArrowDropDownIcon />}
        variant="outlined"
      />
    </Stack>
  );
}