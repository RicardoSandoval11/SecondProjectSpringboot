import { useEffect, useState } from 'react';

import { Grid, Typography, Button, TextField, Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMessageStore } from '../../../hooks/useMessageStore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { usePropertiesStore } from '../../../hooks/usePropertiesStore';
import { formatDates } from '../../../helpers/formatDates';


export const DisplayMessage = ({message}) => {

    const { startRemovingMessage, startClearningMessages } = useMessageStore();
    const { startSendingMessage, startClearingMessages } = usePropertiesStore();
    
    const { removeMessageMsgSuccess, removeMessageMsgFailed } = useSelector( state => state.messages );
    const { successSendMsg, failedSendMsg } = useSelector( state => state.properties );

    // Remove message

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveMessage = () => {
        startRemovingMessage(message.id);
        setOpen(false);
    }

    useEffect(() => {
        if(removeMessageMsgSuccess != null){
            Swal.fire('Message Removed', removeMessageMsgSuccess, 'success');
            startClearningMessages();
        }
    },[removeMessageMsgSuccess]);

    useEffect(() => {
        if(removeMessageMsgFailed != null){
            Swal.fire('Failed Removing Message', removeMessageMsgFailed, 'error');
            startClearningMessages();
        }
    },[removeMessageMsgFailed]);

    // Reply message

    const [openForm, setOpenForm] = useState(false);

    const handleReplyMsgOpen = () => {
        setOpenForm(true);
    };

    const handleCloseReplyMsg = () => {
        setOpenForm(false);
    };

    const [error, setError] = useState(null);

    // Send message
    const handleSendMsg = () => {

        const textField = document.getElementById('replyMsg');

        const msg = textField.value;

        if(msg.length < 1){
            setError('Message cannot be null');
        }
        else{
            setError(null);
            handleCloseReplyMsg();
            startSendingMessage(message.sender.id, message.property.id, msg);
        }

    }

    // Handle sent message
    useEffect(() => {
        if(failedSendMsg != null){
            Swal.fire('Failed Sending Message',failedSendMsg, 'warning');
            startClearingMessages();
        }
    },[failedSendMsg]);

    useEffect(() => {
        if(successSendMsg != null){
            Swal.fire('Message Sent',successSendMsg, 'success');
            startClearingMessages();
        }
    },[successSendMsg]);

  return (
    <Grid
        item
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 2,
            borderRadius: '10px',
            boxShadow: 3,
            padding: 2
        }}
    >
        <Grid item sx={{width: '100%', mb:1}}>
            <Typography variant='body1' sx={{fontWeight: 600}}>{'Property: '}</Typography>
            <Typography variant='body1'>{message.property.title}</Typography>
        </Grid>
        <Grid item sx={{width: '100%', mb:1}}>
            <Typography variant='body1' sx={{fontWeight: 600}}>{'Message: '}</Typography>
            <Typography variant='body1'>{message.message}</Typography>
        </Grid>
        <Grid item sx={{width: '100%', mb:1}}>
            <Typography variant='body1' sx={{fontWeight: 600}}>{'Sender: '}</Typography>
            <Typography variant='body1'>{message.sender.email}</Typography>
        </Grid>
        <Grid item sx={{width: '100%', mb:1}}>
            <Typography variant='body1' sx={{fontWeight: 600}}>{'Date: '}</Typography>
            <Typography variant='body1'>{formatDates(message.createdAt)}</Typography>
        </Grid>
        <Grid 
            item 
            sx={{
                width: '100%', 
                display: 'flex',
                justifyContent: {xs:'center'}
        }}>
            <Button
                variant='contained'
                onClick={handleReplyMsgOpen}
                sx={{backgroundColor: 'primary.main', color: 'white', marginRight:{xs:1}}}
            >
                Reply
            </Button>
            <Dialog open={openForm} onClose={handleCloseReplyMsg}>
                <DialogTitle>Reply Message</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {message.message}
                </DialogContentText>
                <Grid
                    item
                    display={error == null ? 'none' : ''}
                >
                    <Alert
                        severity='error'
                    >
                        {error}
                    </Alert>
                </Grid>
                <TextField
                    autoFocus
                    margin="dense"
                    id="replyMsg"
                    label="Message"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseReplyMsg}>Cancel</Button>
                <Button onClick={handleSendMsg}>Send</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant='contained'
                sx={{
                    backgroundColor: 'error.main', 
                    color: 'white',
                    marginLeft:{xs:1},
                    '&:hover':{
                        backgroundColor: 'white',
                        color: 'error.main'
                    }
                }}
                onClick={handleClickOpen}
            >
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Do You Want To Remove This Message?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once you have deleted the message, you will not be able to recover it
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRemoveMessage} autoFocus>
                    Remove
                </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    </Grid>
  )
}


