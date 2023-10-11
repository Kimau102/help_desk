import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function SelectStatus() {
    const [selectPriority, setSelectPriority] = React.useState('');

    const handleChange = (event) => {
        setSelectPriority(event.target.value);
    };
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">All Priority</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectPriority}
                label="All Priority"
                onChange={handleChange}
            >
                <MenuItem value={10}>Urgent</MenuItem>
                <MenuItem value={20}>High</MenuItem>
                <MenuItem value={30}>Medium</MenuItem>
                <MenuItem value={40}>Low</MenuItem>
            </Select>
        </FormControl>
    );
}

function FilterBar() {
    return (
        <div>
            <h6>Tickets List</h6>
            <div>
                <div style={{ height: 52, width: '100%'}}>
                    <Button variant="contained" color="success">
                        + New Tickets
                    </Button>
                    <SelectStatus />
                </div>
            </div>
        </div>

    )
}
export default FilterBar;