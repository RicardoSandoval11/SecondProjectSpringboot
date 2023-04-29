import { AppLayout } from '../../../layout/AppLayout';
import {Link as RouterLink} from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { specialCharvalidation, UpperLowerValidation } from '../../../helpers/specialCharvalidation';


export const RegisterPage = () => {

    const { startChecking, startRegisterUser, startClearingMessages } = useAuthStore();
    const { status, registerFailedMsg } = useSelector( state => state.auth );

    // Validate form
    const initialErrosState = {
        fullName: null,
        username: null,
        password: null,
        email: null
    };

    const [errors, setErros] = useState(initialErrosState);

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const onfullNameChange = (event) => {
        if(event.target.value.length < 3){
            errors.fullName = 'Name is to short';
        }else if(specialCharvalidation(event.target.value, false)){
            errors.fullName = 'Name cannot contains spacial characters';
        }else{
            errors.fullName = null;
        }
        setFullName(event.target.value);
    }

    const onUsernameChange = (event) => {
        if(event.target.value.length < 3){
            errors.username = 'Username is to short';
        }else if(specialCharvalidation(event.target.value, true)){
            errors.username = 'Name cannot contains spacial characters or spaces';
        }else{
            errors.username = null;
        }
        setUsername(event.target.value);
    }

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

    const onPasswordChange = (event) => {
        if(!specialCharvalidation(event.target.value,false)){
            errors.password = 'Password must contains a special character';
        }else if(event.target.value.length < 12){
            errors.password = 'Password must contains more than 11 characters';
        }else if(!UpperLowerValidation(event.target.value)){
            errors.password = 'Password must contain at least one uppercase letter and one lowercase letter';
        }else {
            errors.password = null;
        }
        setPassword(event.target.value);
    }

    const onPasswordConfirmationChange = (event) => {
        if(password != event.target.value){
            errors.password = 'The passwords entered must be the same';
        }else{
            errors.password = null;
        }
        setPasswordConfirmation(event.target.value);
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if(errors.fullName == null && errors.password == null && errors.username == null && errors.email == null){
            startChecking();
        }
    }

    const onRegisterUser = () => {
        if(errors.fullName == null && errors.password == null && errors.username == null && errors.email == null){
            startRegisterUser(fullName, username, email, password);
        }
    }

    useEffect(() => {
        if(registerFailedMsg != null){
            Swal.fire('Error Creating Account', registerFailedMsg.payload, 'error');
            startClearingMessages();
        }
    },[registerFailedMsg]);

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
                Create Account
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.fullName == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.fullName}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Full Name'
                            variant='standard'
                            placeholder='Jhon Doe'
                            type='text'
                            fullWidth
                            onChange={onfullNameChange}
                            value={fullName}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.username == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.username}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Username'
                            variant='standard'
                            placeholder='Password'
                            type='text'
                            fullWidth
                            onChange={onUsernameChange}
                            value={username}
                        />
                    </Grid>
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
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.password == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.password}</Alert>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
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
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            label='Confirm Password'
                            variant='standard'
                            placeholder='Confirm Password'
                            type='password'
                            fullWidth
                            onChange={onPasswordConfirmationChange}
                            value={passwordConfirmation}
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
                            onClick={onRegisterUser}
                            disabled={status == 'checking'}
                        >
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid item sx={{display:'flex', justifyContent:'space-between', mt:3}}>
            <Grid item><Link to='/auth/login' component={RouterLink}>¿Do you have an account?</Link></Grid>
            <Grid item><Link to='/auth/recover-password' component={RouterLink}>¿Forgot Password?</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}