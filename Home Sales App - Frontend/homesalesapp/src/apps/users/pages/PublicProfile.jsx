import { Grid, Box, Typography, Alert } from '@mui/material';
import { AppLayout } from '../../../layout/AppLayout';
import { useUserStore } from '../../../hooks/useUserStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatDates } from '../../../helpers/formatDates';
import { Checking } from '../../../ui/Checking';


export const PublicProfile = () => {

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    // get user id
    const { id } = useParams();

    const { startLoadingPublicDetails, startLoadingSoldPropertiesByUser } = useUserStore();

    useEffect(() => {
        startLoadingPublicDetails(id);
        startLoadingSoldPropertiesByUser(id);
    }, []);

    const { publicDetails, propertiesSold, status } = useSelector( state => state.users );

  return (
    <AppLayout>
            {
                publicDetails.length == 0 || propertiesSold == null || status == 'checking' ?
                    <Checking/>
                :
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            height: '100vh',
                            justifyContent: 'center',
                            maxWidth: 1400,
                            marginX: 'auto',
                            padding: 4
                        }}
                    >
                    
                :
                    <Grid
                        item
                        sx={{
                            padding: 2
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                flexDirection: {xs:'column', sm:'row'},
                                justifyContent: {md:'space-between'}
                            }}
                        >
                            <Grid
                                container
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: 3
                                }}
                            >
                                <Typography variant='h3' sx={{fontWeight: 600}}>Profile</Typography>
                            </Grid>
                            <Box
                                component="img"
                                sx={{ 
                                    padding:2,
                                    width:{xs:'100%', sm: '55%'} ,
                                    maxWidth: 500, 
                                    margin:{xs:'auto'},
                                    borderRadius: '25px'
                                }}
                                alt={'User Photo'}
                                src={baseUrl+publicDetails.photo_url}
                                className='animate__animated animate__fadeInLeft animate__faster'
                            />
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    padding: 2,
                                    flexDirection: 'column',
                                    width:{xs:'100%', sm: '40%'}
                                }}
                                className='animate__animated animate__fadeInRight animate__faster'
                            >
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>NAME: </b>{publicDetails.name}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>EMAIL: </b>{publicDetails.email}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>SOLD PROPERTIES: </b>{propertiesSold}
                                </Typography>
                                <Typography 
                                    variant='subtitle1'
                                    display='block'
                                    sx={{
                                        textAlign: 'start',
                                        mb: 1
                                    }}
                                >
                                    <b>ABOUT ME: </b>{publicDetails.description}
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
                                    <b>ACTIVE SINCE: </b>{formatDates(publicDetails.register_date)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
            }
    </AppLayout>
  )
}
