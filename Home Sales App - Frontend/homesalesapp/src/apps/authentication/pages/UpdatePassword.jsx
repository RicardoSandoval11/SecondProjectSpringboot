import { AppLayout } from '../../../layout/AppLayout';
import {Link as RouterLink, useParams} from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { specialCharvalidation, UpperLowerValidation } from '../../../helpers/specialCharvalidation';
import { Checking } from '../../../ui/Checking';


export const UpdatePassword = () => {

    const { code } = useParams();

    
    const { startChecking, startVerifyPasswordCode, startClearingMessages, startUpdateUserPassword } = useAuthStore();
    const { status, verifyCodeSuccessMsg, verifyCodeFailedMsg, UpdatePasswordFailedMsg } = useSelector( state => state.auth );

    useEffect(() => {
        startVerifyPasswordCode(code);
    },[]); 

    // Validate form
    const initialErrosState = {
        password: null
    };

    const [errors, setErros] = useState(initialErrosState);

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

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

        if(errors.password == null && password == passwordConfirmation){
            startChecking();
        }
    }

    const onUpdatepassword = () => {
        if(errors.password == null && password == passwordConfirmation){
            startUpdateUserPassword(code, password);
        }
    }

    useEffect(() => {

        if(UpdatePasswordFailedMsg != null){
            Swal.fire('Update Password Error'. UpdatePasswordFailedMsg, 'error');
            startClearingMessages();
        }

    },[UpdatePasswordFailedMsg])

  return (
    <AppLayout>
        {
            verifyCodeSuccessMsg == null && verifyCodeFailedMsg == null?
                <Checking/>
            :
                verifyCodeSuccessMsg != null && verifyCodeFailedMsg == null?
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
                                Update Password
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <Grid container sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.password == null ? 'none' : ''}>
                                        <Alert severity='error'>{errors.password}</Alert>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <TextField
                                            label='New Password'
                                            variant='standard'
                                            placeholder='New Password'
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
                                            onClick={onUpdatepassword}
                                            disabled={status == 'checking'}
                                        >
                                            Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                :
                    <Grid
                        container
                        sx={{
                            maxWidth: 1400,
                            display: 'flex',
                            height: '100vh',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginX: 'auto'
                        }}
                    >
                        <Grid 
                            item
                            sx={{
                            display: 'flex',
                            justifyContent:'center'
                            }}
                        >
                            <Alert severity='error'>Invalid Code</Alert>
                        </Grid>
                    </Grid>
        }
    </AppLayout>
  )
}