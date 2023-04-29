import { useEffect, useState } from "react";

import { Grid, Typography, Box, Link, Alert, TextField, Button  } from "@mui/material";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";

import { usePropertiesStore } from "../../../hooks/usePropertiesStore";
import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from "../../../ui/Checking";
import { formatDates } from "../../../helpers/formatDates";


export const DisplayPropertyDetails = () => {

    const { status: authStatus } = useSelector( state => state.auth ); 

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    const { id } = useParams();

    const { startLoadingPropertyDetails, startSendingMessage, startClearingMessages } = usePropertiesStore();

    useEffect(() => {
        startLoadingPropertyDetails(id);
    },[]);

    const { status, propertyDetails, successSendMsg, failedSendMsg } = useSelector( state => state.properties );

    // Validate form
    const initialErrors = {
        message: null
    };

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState(initialErrors);

    const onMessageChange = (event) => {
        if(event.target.value.length < 15){
            errors.message = 'The message must contain more than 15 characters';
        }else{
            errors.message = null;
        }
        setMessage(event.target.value);
    }

    // Handle submit form
    const onSubmtMessage = (event) => {
        event.preventDefault();
    }

    const onSendingMessage = () => {
        if (errors.message == null) {
            startSendingMessage(propertyDetails.user.id, propertyDetails.id, message);
        }
    }

    // Handle sent message
    useEffect(() => {
        if(failedSendMsg != null){
            Swal.fire('Failed Sending Message',failedSendMsg, 'warning');
            setMessage('');
            startClearingMessages();
        }
    },[failedSendMsg]);

    useEffect(() => {
        if(successSendMsg != null){
            Swal.fire('Message Sent',successSendMsg, 'success');
            setMessage('');
            startClearingMessages();
        }
    },[successSendMsg]);

  return (
    <>
        {
            status == 'checking' || propertyDetails.length == 0?
                <AppLayout>
                    <Checking/>
                </AppLayout>
            :
                <AppLayout>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            maxWidth: 1400,
                            marginX: 'auto'
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                marginY: 2,
                                padding: 2
                            }}
                        >
                            <Typography
                                variant='h4'
                                display='block'
                                xs={12}
                                sx={{ textAlign: 'start', fontSize:{xs:'24px', md:'40px', fontWeight:600 , width: '100%'} }}
                            >
                                {propertyDetails.title}
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                display='block'
                                xs={12}
                                sx={{ textAlign: 'start', fontWeight: 500, color: '#919192', width: '100%' }}
                            >
                                {`${propertyDetails.location}`}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                flexDirection: {xs:'column', md:'row'},
                                justifyContent: {md:'space-between'}
                            }}
                        >
                            <Box
                                component="img"
                                sx={{ padding:2,width:{xs:'100%', lg: '60%'} ,maxWidth: 800, margin:{xs:'auto'}}}
                                alt={propertyDetails.title}
                                src={baseUrl+propertyDetails.image}
                                className='animate__animated animate__fadeInLeft animate__faster'
                            />
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    padding: 2,
                                    flexDirection: 'column',
                                    width:{xs:'100%', lg: '40%'}
                                }}
                            >
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>STATUS: </b>
                                    <span 
                                        style={{
                                            color:propertyDetails.status === 'sold' ? 'red' : 'green',
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            textTransform: 'capitalize',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {propertyDetails.status}
                                    </span>
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>PRICE: </b>{propertyDetails.price.value}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>BEDROOMS: </b>{propertyDetails.rooms}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>BATHROOMS: </b>{propertyDetails.wc}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>DESCRIPTION: </b>{propertyDetails.description}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 3
                                    }}
                                >
                                    <b>CATEGORY: </b>
                                    <RouterLink 
                                        to={`/properties/filter-category/${propertyDetails.category.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#089fff'
                                        }}
                                    >
                                        {propertyDetails.category.name}
                                    </RouterLink>
                                </Typography>
                                <Typography 
                                    variant='body1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1,
                                        color: '#919192'
                                    }}
                                >
                                    <b>LAST UPDATE: </b>{formatDates(propertyDetails.updatedAt)}
                                </Typography>
                                <Typography 
                                    variant='body1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1,
                                        color: '#919192'
                                    }}
                                >
                                    <b>CREATED AT: </b>{formatDates(propertyDetails.createdAt)}
                                </Typography>
                                <Typography 
                                    variant='body1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1,
                                        color: '#919192'
                                    }}
                                >
                                    <b>PUBLISHED BY: </b>{propertyDetails.user.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='h5' sx={{ mb: 1, display: 'block', width: '100%', textAlign: 'center', fontWeight: 600 }}>
                            CONTACT THE OWNER
                        </Typography>
                        {
                            authStatus == 'authenticated' ?
                                propertyDetails.user.username == localStorage.getItem('username') ?
                                <Grid sx={{marginY: 5}}>
                                    <RouterLink  
                                        to={'/messages/my-messages'}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#089fff',
                                            textDecoration: 'none'
                                        }} >
                                        Check your messages for this property
                                    </RouterLink>
                                </Grid>
                                :
                                <form onSubmit={onSubmtMessage}>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            m: 2,
                                            padding: 2,
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                            width: '100%'
                                        }}
                                    >
                                        <Grid 
                                            item
                                            xs={8}
                                            sx={{mt: 1}}
                                            display={errors.message == null ? 'none' : ''}
                                        >
                                            <Alert severity='error'>
                                                {errors.message}
                                            </Alert>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1, marginX: 'auto' }}>
                                            <TextField 
                                                label = 'Message'
                                                type= 'text'
                                                placeholder='Message'
                                                fullWidth
                                                name='message'
                                                onChange={onMessageChange}
                                                value={message}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container sx= {{ mb: 5, display:'flex', justifyContent:'center' }}>
                                        <Grid item 
                                            xs={8}
                                        >
                                            <Button 
                                                type='submit' 
                                                variant='contained' 
                                                fullWidth
                                                onClick={onSendingMessage}
                                                sx={{color: 'white'}}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            :
                                <Alert variant="filled" severity="info" sx={{marginY: 5}}>
                                    Login to Contact the Seller
                                </Alert>
                        }
                    </Grid>
                </AppLayout>
        }
    </>
  )
}


