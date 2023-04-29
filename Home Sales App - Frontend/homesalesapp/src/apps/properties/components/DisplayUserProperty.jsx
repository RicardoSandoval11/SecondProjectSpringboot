import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { CardActions, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usePropertiesStore } from '../../../hooks/usePropertiesStore';
import { useNavigate } from 'react-router-dom';

export const DispaylUserProperty = ({property}) => {

    const navigate = useNavigate();

    const { startRemovingproperty } = usePropertiesStore();

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveProperty = () => {
        setOpen(false);
        startRemovingproperty(property.id);
        navigate('/');
    }

    const handleEditProperty = () => {
      navigate(`/properties/edit/${property.id}`);
    }


  return (
    <Card sx={{ maxWidth: 345, marginX: 1, marginY:1 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: red[500] }} 
            aria-label="recipe" 
            src={baseUrl+property.user.photo_url}
        >
          </Avatar>
        }
        title={property.title.length > 32 ? property.title.slice(0,32)+'...' : property.title}
        subheader={property.location}
      />
      <CardMedia
        component="img"
        height="194"
        image={baseUrl+property.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {property.description.length > 100 ? property.description.slice(0,200)+'...' : property.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`You are about to delete the property ${property.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this property?
            Once you have deleted this property, you will not be able to get it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveProperty} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        <IconButton aria-label="share" onClick={handleEditProperty}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}