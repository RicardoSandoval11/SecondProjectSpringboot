import { Grid, Typography, TextField, Button, Alert, Fab } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";
import { useUserStore } from "../../../hooks/useUserStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { specialCharvalidation } from "../../../helpers/specialCharvalidation";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore";
import { AddCircle } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


export const UpdateInformation = () => {

    const navigate = useNavigate();

    const { startLoadingDashboardUserDetails, startChecking, startUpdatingUserDetails } = useUserStore();
    const { obtainImageData } = usePropertiesStore();

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    useEffect(() => {
        startLoadingDashboardUserDetails();
    },[]);

    const { privateDetalis, status } = useSelector( state => state.users );

    // errors
    const initialErrors = {
        name: null,
        email: null,
        username: null,
        description: null
    }

    const [errors, setErrors] = useState(initialErrors);

    // fields

    const [name, setName] = useState('');

    useEffect(() => {
        if(privateDetalis.name != undefined){
            if(name == ''){
                setName(privateDetalis.name);
            }
        }

    },[privateDetalis.name]);

    const onNameChange = (event) => {
        if(specialCharvalidation(event.target.value, false)){
            errors.name = 'Name cannot contain special characters';
        }else if(event.target.value.trim().length < 1){
            errors.name = 'Name cannot be empty';
        }else{
            errors.name = null;
        }
        setName(event.target.value);
    }

    const [email, setEmail] = useState('');

    useEffect(() => {
        if(privateDetalis.email != undefined){
            if(email == ''){
                setEmail(privateDetalis.email);
            }
        }

    },[privateDetalis.email]);

    const onEmailChange = (event) => {
        if(!event.target.value.includes('@')){
            errors.email = 'Email must contain @';
        }else if(!event.target.value.includes('.')){
            errors.email = 'Email must have a domain';
        }else{
            errors.email = null;
        }
        setEmail(event.target.value);
    }

    const [username, setUsername] = useState('');

    useEffect(() => {
        if(privateDetalis.username != undefined){
            if(username == ''){
                setUsername(privateDetalis.username);
            }
        }

    },[privateDetalis.username]);

    const onUsernameChange = (event) => {
        if(specialCharvalidation(event.target.value, true)){
            errors.username = 'Username cannot contain special characters';
        }else if(event.target.value.trim().length < 1){
            errors.username = 'Username cannot be empty';
        }else{
            errors.username = null;
        }
        setUsername(event.target.value);
    }

    const [description, setDescription] = useState('');

    useEffect(() => {
        if(privateDetalis.description != undefined){
            if(description == ''){
                setDescription(privateDetalis.description);
            }
        }

    },[privateDetalis.description]);

    const onDescriptionChange = (event) => {
        if(event.target.value.trim().length < 1){
            errors.description = 'Description cannot be empty';
        }else{
            errors.description = null;
        }
        setUsername(event.target.value);
    }

    const [image, setImage] = useState(null);

    useEffect(() => {

        if(privateDetalis.photo_url != undefined){
            if(image == null){
                const filePromise = obtainImageData(baseUrl+privateDetalis.photo_url, privateDetalis.photo_url);
                filePromise.then((file) => {
                    setImage(file);
                  }).catch((error) => {
                    console.log(error);
                  });
            }
        }

    }, [privateDetalis.photo_url]);

    const onImageFieldChange = (event) => {
 
        setImage(event.target.files[0]);

    }

    // submit form
    const onSumbitForm = (event) => {
        event.preventDefault();
        if(errors.name == null && errors.email == null && errors.username == null && errors.description == null){
            startChecking();
        }
    }

    const onUpdateUserInformation = () => {
        if(errors.name == null && errors.email == null && errors.username == null && errors.description == null){
            const formData = new FormData();
            formData.append('id', privateDetalis.id);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('photo_url', image);
            formData.append('description', description);
            startUpdatingUserDetails(formData);
            navigate('/user/dashboard');
        }
    }

  return (
    <AppLayout>
      <Grid
        container
        sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 1400,
            marginX: 'auto'
        }}
      >
        <Grid
            item
            sx={{
                backgroundColor:'white',
                borderRadius: '10px',
                boxShadow: 3,
                padding: 2,
            }}
            xs={11} 
            sm={6} 
            className = 'animate__animated animate__fadeIn animate__faster'
        >
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <Typography variant="h6">Update My Information</Typography>
            </Grid>
            <form onSubmit={onSumbitForm}>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent:{xs:'center', md:'space-between'}
                    }}
                >
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.name == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.name}</Alert>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 2
                        }}
                    >
                        <TextField
                            type='text'
                            variant='standard'
                            label='Name'
                            fullWidth
                            onChange={onNameChange}
                            value={name}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.email == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.email}</Alert>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 2
                        }}
                    >
                        <TextField
                            type='email'
                            variant='standard'
                            label='Email'
                            fullWidth
                            onChange={onEmailChange}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.username == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.username}</Alert>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 2
                        }}
                    >
                        <TextField
                            type='text'
                            variant='standard'
                            label='Username'
                            fullWidth
                            onChange={onUsernameChange}
                            value={username}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={errors.description == null ? 'none' : ''}>
                        <Alert severity='error'>{errors.description}</Alert>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 3
                        }}
                    >
                        <TextField
                            type='text'
                            variant='standard'
                            label='Description'
                            fullWidth
                            onChange={onDescriptionChange}
                            value={description}
                        />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={onImageFieldChange}
                            />
                                <Fab
                                    color="secondary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                <AddCircle /> Profile picture
                                </Fab>
                        </label>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            marginBottom: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button 
                            variant="contained" 
                            sx={{color: 'white'}}   
                            disabled={status == 'searching'}
                            type="submit"
                            onClick={onUpdateUserInformation}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
      </Grid>
    </AppLayout>
  )
}


