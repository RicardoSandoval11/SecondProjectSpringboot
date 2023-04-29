import { AppLayout } from '../../../layout/AppLayout';
import {Link as RouterLink} from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export const RecoverPassword = () => {

    const { startChecking, startRequestUpdatePassword, startClearingMessages } = useAuthStore();
    const { status, recoverPasswordRequestSuccessMsg, recoverPasswordRequestFailedMsg } = useSelector( state => state.auth );

    // Validate form
    const initialErrosState = {
        email: null
    };

    const [errors, setErros] = useState(initialErrosState);

    const [email, setEmail] = useState('');

    const onEmailChange = (event) => {
        if(!event.target.value.includes('@')){
            errors.email = 'Email must contains symbol @';
        }else if(!event.target.value.includes('.')){
            errors.email = 'Email must have a valid domain';
        }else{
            errors.email = null;
        }
        setEmail(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if( errors.email == null){
            startChecking();
        }
    }

    const onSendUpdatepasswordLink = () => {
        if(errors.email == null){
            startRequestUpdatePassword(email);
        }
    }

    // results notification
    useEffect(() => {

        if(recoverPasswordRequestSuccessMsg != null){
            Swal.fire('Link Sent', recoverPasswordRequestSuccessMsg, 'success');
            startClearingMessages();
            setEmail('');
        }

    },[recoverPasswordRequestSuccessMsg]);

    useEffect(() => {

        if(recoverPasswordRequestFailedMsg != null){
            Swal.fire('Send Link Failed', recoverPasswordRequestFailedMsg, 'error');
            startClearingMessages();
        }

    },[recoverPasswordRequestFailedMsg]);

  return (
    <AppLayout>
      <Grid
        container
        sx={{
            backgroundColor: 'white',
            height: '100vh',
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
        }}
      >
        <Grid
            item
            sx={{
                backgroundColor:'white',
                borderRadius: '10px',
                boxShadow: 3,
                padding: 2
            }}
            xs={11} 
            sm={7} 
            md={5} 
            lg={4} 
            xl={3}
            className = 'animate__animated animate__fadeIn animate__faster'
        >
            <Typography variant='h5' sx={{ mb: 1, fontWeight:600 }}>
                Recover Password
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.email == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.email}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Email'
                            variant='standard'
                            placeholder='Email'
                            type='email'
                            fullWidth
                            onChange={onEmailChange}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mt: 3 }}>
                        <Button
                            label='Password'
                            variant='contained'
                            placeholder='Password'
                            type='submit'
                            fullWidth
                            sx={{color:'white'}}
                            onClick={onSendUpdatepasswordLink}
                            disabled={status == 'checking'}
                        >
                            Send Link
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid item sx={{display:'flex', justifyContent:'space-between', mt:3}}>
                <Grid item><Link to='/auth/register' component={RouterLink}>Create Account</Link></Grid>
                <Grid item><Link to='/auth/login' component={RouterLink}>¿Do You Have an Account?</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}