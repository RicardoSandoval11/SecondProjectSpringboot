
import { useEffect, useState } from 'react';
import { AppLayout } from '../../../layout/AppLayout';
import { useSelector } from 'react-redux';
import { Grid, Typography, TextField, Button, Fab, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AddCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Checking } from '../../../ui/Checking';
import { usePropertiesStore } from '../../../hooks/usePropertiesStore';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { usePriceStore } from '../../../hooks/usePriceStore';

export const CreateProperty = () => {

    const navigate = useNavigate();

    const { startChecking, startCreatingProperty } = usePropertiesStore();
    const { startLoadingAllCompleteCategories } = useCategoryStore();
    const { startLoadingAllPrices } = usePriceStore();

    useEffect(() => {
        startLoadingAllCompleteCategories();
        startLoadingAllPrices();
    },[]);

    const { status } = useSelector( state => state.properties );
    const { prices } = useSelector( state => state.prices );
    const { allCategories } = useSelector( state => state.categories );

    // fields
    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [rooms, setRooms] = useState('');

    const [parking, setParking] = useState('');

    const [wc, setWc] = useState('');

    const [location, setLocation] = useState('');

    const [published, setPublished] = useState('');

    const [category, setCategory] = useState('');

    const [price, setPrice] = useState('');

    const [propertyStatus, setStatus] = useState('');

    const [image, setImage] = useState(null);


    // hanld fields change

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onDescriptionChange = (event) => {
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

    const onImageFieldChange = (event) => {
 
        setImage(event.target.files[0]);

    }

    const onStatusChange = (event) => {
        setStatus(event.target.value);
    }

    // Handle submit
    const onSubmitForm = (event) => {
        event.preventDefault();
        if(title != ''
            && description != ''
            && location != ''
            && rooms != ''
            && parking != ''
            && wc != ''
            && category != ''
            && price != ''
            && propertyStatus != ''
            && image != null){
            startChecking();
        }
    }

    const onCreateProperty = () => {
        if(title != ''
            && description != ''
            && location != ''
            && rooms != ''
            && parking != ''
            && wc != ''
            && category != ''
            && price != ''
            && propertyStatus != ''
            && image != null){

            const formData = new FormData();
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
            formData.append('image', image);
            formData.append('status', propertyStatus);
            startCreatingProperty(formData);
            navigate('/');
        }else{
            Swal.fire('Empty Fields', 'All fields are required', 'warning');
        }
    }

  return (
    <AppLayout>
      {
        status != 'checking' && allCategories != null && prices != null?
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
                            Publish Your Property
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
                                onClick={onCreateProperty}
                                disabled={status == 'checking'}
                                type='submit'
                            >
                                Create
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

