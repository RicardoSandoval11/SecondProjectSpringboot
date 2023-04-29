
import { useEffect, useState } from 'react'
import { AppLayout } from '../../../layout/AppLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Grid, Typography, TextField, Alert, Button, Fab, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AddCircle } from '@mui/icons-material';

import { Checking } from '../../../ui/Checking';
import { usePropertiesStore } from '../../../hooks/usePropertiesStore';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { usePriceStore } from '../../../hooks/usePriceStore';

export const EditProperty = () => {

    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    const {propertyId} = useParams();

    const { startLoadingPropertyDetails, startChecking, startUpdatingProperty, obtainImageData } = usePropertiesStore();
    const { startLoadingAllCompleteCategories } = useCategoryStore();
    const { startLoadingAllPrices } = usePriceStore();

    useEffect(() => {
        startLoadingPropertyDetails(propertyId);
        startLoadingAllCompleteCategories();
        startLoadingAllPrices();
    },[]);

    const { propertyDetails, status } = useSelector( state => state.properties );
    const { prices } = useSelector( state => state.prices );
    const { allCategories } = useSelector( state => state.categories );

    // fields
    const [title, setTitle] = useState('');

    useEffect(() => {
        if(propertyDetails.title != undefined){
            if(title == ''){
                setTitle(propertyDetails.title);
            }
        }
    },[propertyDetails.title]);

    const [description, setDescription] = useState('');

    useEffect(() => {
        if(propertyDetails.description != undefined){
            if(description == ''){
                setDescription(propertyDetails.description);
            }
        }
    },[propertyDetails.description]);

    const [rooms, setRooms] = useState(1);

    useEffect(() => {
        if(propertyDetails.rooms != undefined){
            if(rooms == 1){
                setRooms(propertyDetails.rooms);
            }
        }
    },[propertyDetails.rooms]);

    const [parking, setParking] = useState(1);

    useEffect(() => {
        if(propertyDetails.parking != undefined){
            if(parking == 1){
                setParking(propertyDetails.parking);
            }
        }
    },[propertyDetails.parking]);

    const [wc, setWc] = useState(1);

    useEffect(() => {
        if(propertyDetails.wc != undefined){
            if(wc == 1){
                setWc(propertyDetails.wc);
            }
        }
    },[propertyDetails.wc]);

    const [location, setLocation] = useState('');

    useEffect(() => {
        if(propertyDetails.location != undefined){
            if(location == ''){
                setLocation(propertyDetails.location);
            }
        }
    },[propertyDetails.location]);

    const [published, setPublished] = useState(0);

    useEffect(() => {
        if(propertyDetails.published != undefined){
            setPublished(propertyDetails.published);
        }
    },[propertyDetails.published]);

    const [category, setCategory] = useState('');

    useEffect(() => {
        if(propertyDetails.category != undefined){
            if(category == ''){
                setCategory(propertyDetails.category.id);
            }
        }
    },[propertyDetails.category]);

    const [price, setPrice] = useState('');

    useEffect(() => {
        if(propertyDetails.price != undefined){
            if(price == ''){
                setPrice(propertyDetails.price.id);
            }
        }
    },[propertyDetails.price]);

    const [image, setImage] = useState(null);

    useEffect(() => {

        if(propertyDetails.image != undefined){
            if(image == null){
                const filePromise = obtainImageData(baseUrl+propertyDetails.image, propertyDetails.image);
                filePromise.then((file) => {
                    setImage(file);
                  }).catch((error) => {
                    console.log(error);
                  });
            }
        }

    }, [propertyDetails.image])


    const onImageFieldChange = (event) => {
 
        setImage(event.target.files[0]);

    }

    const [propertyStatus, setStatus] = useState('');

    useEffect(() => {

        if(propertyDetails.status != undefined){
            if(propertyStatus == ''){
                setStatus(propertyDetails.status);
            }
        }

    },[propertyDetails.status]);


    // handle errors
    const initialErrors = {
        title: null,
        description: null,
        location: null
    }

    const [errors, setErrors] = useState(initialErrors);


    // hanld fields change

    const onTitleChange = (event) => {
        if(event.target.value.trim().length < 1){
            errors.title = 'Title cannot be empty'
        }else{
            errors.title = null;
        }
        setTitle(event.target.value);
    }

    const onDescriptionChange = (event) => {
        if(event.target.value.trim().length < 1){
            errors.description = 'The description cannot be empty'
        }else{
            errors.description = null;
        }
        setDescription(event.target.value);
    }

    const onRoomsChange = (event) => {
        setRooms(event.target.value);
    }

    const onParkingChange = (event) => {
        setParking(event.target.value);
    }

    const onWcChange = (event) => {
        setWc(event.target.value);
    }

    const onLocationChange = (event) => {
        if(event.target.value.trim().length < 1){
            errors.location = 'Location cannot be empty';
        }else{
            errors.location = null;
        }
        setLocation(event.target.value);
    }

    const onPublishedChange = (event) => {
        setPublished(event.target.value);
    }

    const onCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value);
    }

    const onStatusChange = (event) => {
        setStatus(event.target.value);
    }

    // Handle submit
    const onSubmitForm = (event) => {
        event.preventDefault();
        if(errors.title == null && errors.description == null && errors.location == null){
            startChecking();
        }
    }

    const onUpdatingProperty = () => {
        if(errors.title == null && errors.description == null && errors.location == null){

            const formData = new FormData();
            formData.append('id',propertyDetails.id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('rooms', rooms);
            formData.append('parking', parking);
            formData.append('wc', wc);
            formData.append('published', published);
            formData.append('categoryId', category);
            formData.append('priceId', price);
            formData.append('username', localStorage.getItem('username'));
            if (image != null) {
                formData.append('image', image);
            }
            formData.append('status', propertyStatus);
            startUpdatingProperty(formData);
            navigate('/');
        }
    }

  return (
    <AppLayout>
      {
        propertyDetails.id != undefined && status != 'checking' && allCategories != null && prices != null?
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexWrap: 'wrap',
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
                    sm={10} 
                    xl={8}
                    className = 'animate__animated animate__fadeIn animate__faster'
                >
                    <Grid 
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 2,
                            width: '100%',
                            marginX: 'auto'
                        }}
                    >
                        <Typography 
                            variant='h6'
                            sx={{
                                fontWeight: 600
                            }}
                        >
                            Update Property
                        </Typography>
                    </Grid>
                <form onSubmit={onSubmitForm}>
                    <Grid
                        container
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent:{xs:'center', md:'space-between'}
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                marginBottom: 1,
                                width: '100%'
                            }}
                            display={errors.title == null ? 'none': ''}
                        >
                            <Alert severity='error'>{errors.title}</Alert>
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
                                label='Title'
                                fullWidth
                                onChange={onTitleChange}
                                value={title}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                marginBottom: 1,
                                width: '100%'
                            }}
                            display={errors.description == null ? 'none': ''}
                        >
                            <Alert severity='error'>{errors.description}</Alert>
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
                                label='Description'
                                fullWidth
                                onChange={onDescriptionChange}
                                value={description}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                marginBottom: 1,
                                width: '100%'
                            }}
                            display={errors.location == null ? 'none': ''}
                        >
                            <Alert severity='error'>{errors.location}</Alert>
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
                                label='Location'
                                fullWidth
                                onChange={onLocationChange}
                                value={location}
                            />
                        </Grid>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="rooms">Rooms</InputLabel>
                            <Select
                                labelId="rooms"
                                id="rooms"
                                value={rooms}
                                label="Rooms"
                                onChange={onRoomsChange}
                                fullWidth
                            >
                                <MenuItem value={1} key={1}>One</MenuItem>
                                <MenuItem value={2} key={2}>Two</MenuItem>
                                <MenuItem value={3} key={3}>Three</MenuItem>
                                <MenuItem value={4} key={4}>Four</MenuItem>
                                <MenuItem value={5} key={5}>Five</MenuItem>
                                <MenuItem value={6} key={6}>Six</MenuItem>
                                <MenuItem value={7} key={7}>Sevent</MenuItem>
                                <MenuItem value={8} key={8}>Eight</MenuItem>
                                <MenuItem value={9} key={9}>Nine</MenuItem>
                                <MenuItem value={10} key={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="parking">parking</InputLabel>
                            <Select
                                labelId="parking"
                                id="parking"
                                value={parking}
                                label="Parking"
                                onChange={onParkingChange}
                                fullWidth
                            >
                                <MenuItem value={1} key={1}>One</MenuItem>
                                <MenuItem value={2} key={2}>Two</MenuItem>
                                <MenuItem value={3} key={3}>Three</MenuItem>
                                <MenuItem value={4} key={4}>Four</MenuItem>
                                <MenuItem value={5} key={5}>Five</MenuItem>
                                <MenuItem value={6} key={6}>Six</MenuItem>
                                <MenuItem value={7} key={7}>Sevent</MenuItem>
                                <MenuItem value={8} key={8}>Eight</MenuItem>
                                <MenuItem value={9} key={9}>Nine</MenuItem>
                                <MenuItem value={10} key={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="wc">wc</InputLabel>
                            <Select
                                labelId="wc"
                                id="wc"
                                value={wc}
                                label="Wc"
                                onChange={onWcChange}
                                fullWidth
                            >
                                <MenuItem value={1} key={1}>One</MenuItem>
                                <MenuItem value={2} key={2}>Two</MenuItem>
                                <MenuItem value={3} key={3}>Three</MenuItem>
                                <MenuItem value={4} key={4}>Four</MenuItem>
                                <MenuItem value={5} key={5}>Five</MenuItem>
                                <MenuItem value={6} key={6}>Six</MenuItem>
                                <MenuItem value={7} key={7}>Sevent</MenuItem>
                                <MenuItem value={8} key={8}>Eight</MenuItem>
                                <MenuItem value={9} key={9}>Nine</MenuItem>
                                <MenuItem value={10} key={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="published">Published</InputLabel>
                            <Select
                                labelId="published"
                                id="published"
                                value={published}
                                label="Published"
                                onChange={onPublishedChange}
                                fullWidth
                            >
                                <MenuItem value={1} key={1}>Yes</MenuItem>
                                <MenuItem value={0} key={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={onCategoryChange}
                                fullWidth
                            >
                                {
                                    allCategories.map((category) => {
                                        return (
                                            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="price">Price</InputLabel>
                            <Select
                                labelId="category"
                                id="price"
                                value={price}
                                label="Price"
                                onChange={onPriceChange}
                                fullWidth
                            >
                                {
                                    prices.map((price) => {
                                        return (
                                            <MenuItem value={price.id} key={price.id}>{price.value}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mb: 2, width:{xs:'100%', md: '45%'}}}>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={propertyStatus}
                                label="Status"
                                onChange={onStatusChange}
                                fullWidth
                            >
                                <MenuItem value={'for sale'} key={'for_sale'}>For Sale</MenuItem>           
                                <MenuItem value={'sold'} key={'sold'}>Sold</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid
                            item
                            sx={{
                                width: '100%',
                                marginBottom: 2,
                                marginX: 'auto',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Link href={baseUrl+propertyDetails.image} target='_blank'>Current Photo</Link>
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
                                    <AddCircle /> Property Image
                                    </Fab>
                            </label>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: '100%',
                                marginBottom: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                marginY: 3
                            }}
                        >
                            <Button
                                variant='contained'
                                sx={{
                                    width: '40%',
                                    color: 'white'
                                }}
                                onClick={onUpdatingProperty}
                                disabled={status == 'checking'}
                                type='submit'
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                </Grid>
            </Grid>
        :
            <Checking/>
      }
    </AppLayout>
  )
}

