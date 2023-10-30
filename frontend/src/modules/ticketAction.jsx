import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit'
import HalfRating from '../components/rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function DeleteTicketDialog({id}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = async () => {
        const res = await fetch('/api/tickets', {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        if (res.status ===200 ) {
			window.location.href = '/all-tickets'
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    return (
        <div>
            <Button>
                <DeleteIcon onClick={handleClickOpen} />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure delete the ticket?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function TicketAction({ ticketInfo }) {
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState(ticketInfo.status)

    const StatusSelectOptionChip = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleStatusSelect = (status) => {
            setSelectedStatus(status)
            handleClose();
        }

        return (
            <>
                <Stack direction="row" spacing={1}>
                    <Chip
                        label={selectedStatus || ticketInfo.status}
                        onClick={handleClick}
                        Icon={<ArrowDropDownIcon />}
                        variant="outlined"
                    />
                </Stack>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => handleStatusSelect('Open')}>Open</MenuItem>
                    <MenuItem onClick={() => handleStatusSelect('Processing')}>Processing</MenuItem>
                    <MenuItem onClick={() => handleStatusSelect('Solve')}>Solve</MenuItem>
                    <MenuItem onClick={() => handleStatusSelect('On Hold')}>On Hold</MenuItem>
                    <MenuItem onClick={() => handleStatusSelect('Closed')}>Closed</MenuItem>
                    <MenuItem onClick={() => handleStatusSelect('Pending')}>Pending</MenuItem>
                </Menu>
            </>
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
        setSelectedStatus(ticketInfo.status)
    };

    const handleSave = async (newStatus) => {
        const res = await fetch('/api/tickets', {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ id: ticketInfo.id, status: selectedStatus })
        })

        if (res.status ===200 ) {
			window.location.href = '/all-tickets'
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    return (
        <div>
            <Button color='secondary'>
                <EditIcon onClick={handleClickOpen} />
            </Button>
            <BootstrapDialog
                onClose={handleClickClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Ticket Info
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClickClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={true}>
                    <Typography gutterBottom>
                        Ticket ID:{ticketInfo.id}
                    </Typography>
                    <Typography gutterBottom>
                        Created: {ticketInfo.created_at}
                    </Typography>
                    <Typography gutterBottom>
                        Last message: {ticketInfo.last_message}
                    </Typography>
                    <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                        Status: <StatusSelectOptionChip />
                    </Typography>
                    <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                        Rating: <HalfRating />
                    </Typography>
                    <Typography gutterBottom>
                        Priority: {ticketInfo.priority}
                    </Typography>
                    <Typography gutterBottom>
                        Source:
                    </Typography>
                    <Typography gutterBottom>
                        Tags:
                    </Typography>
                    <DeleteTicketDialog color='secondary' id={ticketInfo.id} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave}>
                        Save changes
                    </Button>
                    <Button autoFocus onClick={handleClickClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
