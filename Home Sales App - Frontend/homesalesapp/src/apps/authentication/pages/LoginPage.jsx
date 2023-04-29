import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { AppLayout } from '../../../layout/AppLayout';
import {Link as RouterLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { specialCharvalidation } from '../../../helpers/specialCharvalidation';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const LoginPage = () => {

    const { startLogin, startChecking, startClearingMessages } = useAuthStore();

    const { status, loginFailedMsg, UpdatePasswordSuccessMsg } = useSelector( state => state.auth );


    // Validating form
    const initialErrors = {
        username: null,
        password: null
    };

    const [errors, setErrors] = useState(initialErrors);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (event) => {
        if(event.target.value.length < 3){
            errors.username = 'The username is to short';
        }else if(specialCharvalidation(event.target.value, true)){
            errors.username = 'Username cannot contains special characters or spaces';
        }else {
            errors.username = null;
        }
        setUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        if(event.target.value.length < 8){
            errors.password = 'Password must contains at least 8 characters';
        }else{
            errors.password = null;
        }
        setPassword(event.target.value);
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if (errors.username == null && errors.password == null ) {
            startChecking();
        }
    }

    const onLoginUser = () => {

        if (errors.username == null && errors.password == null ) {
            startLogin(username, password);
        } 

    }

    useEffect(() => {
        if(loginFailedMsg != null){
            Swal.fire('Login Failed', loginFailedMsg, 'error');
            startClearingMessages();
        }
    },[loginFailedMsg]);

    useEffect(() => {
        if(UpdatePasswordSuccessMsg != null){
            Swal.fire('Password Updated', UpdatePasswordSuccessMsg, 'success');
            startClearingMessages();
        }
    },[UpdatePasswordSuccessMsg]);

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
                Login
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.username == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.username}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Username'
                            variant='standard'
                            placeholder='Username'
                            type='text'
                            fullWidth
                            onChange={onUsernameChange}
                            value={username}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.password == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.password}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Password'
                            variant='standard'
                            placeholder='Password'
                            type='password'
                            fullWidth
                            onChange={onPasswordChange}
                            value={password}
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
                            onClick={onLoginUser}
                            disabled={status == 'checking'}
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid item sx={{display:'flex', justifyContent:'space-between', mt:3}}>
            <Grid item><Link to='/auth/register' component={RouterLink}>Create Account</Link></Grid>
            <Grid item><Link to='/auth/recover-password' component={RouterLink}>¿Forgot Password?</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}


