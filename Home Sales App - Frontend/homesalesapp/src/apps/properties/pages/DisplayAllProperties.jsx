import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

import { AppLayout } from '../../../layout/AppLayout';
import { Checking } from '../../../ui/Checking';
import { DispaylProperty } from '../components/DisplayProperty';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { usePriceStore } from '../../../hooks/usePriceStore';
import { usePropertiesStore } from '../../../hooks/usePropertiesStore';


export const DisplayAllProperties = () => {

    const { startLoadingFilteredProperties } = usePropertiesStore();
    const { startloadingAllCategories } = useCategoryStore();
    const { startLoadingAllPrices } = usePriceStore();

    // Validating filter params
    const [kword, setKword] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onKwordChange = (event) => {
        setKword(event.target.value);
    }

    const onCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value);
    }

    const onStartDateChange = (event) => {
        setStartDate(event.$d);
    }

    const onEndDateChange = (event) => {
        setEndDate(event.$d);
    }

    // Pagination
    const [page, setPage] = useState(0);

    useEffect(() => {
        startloadingAllCategories();
        startLoadingAllPrices();
        startLoadingFilteredProperties(kword, category, price, startDate, endDate, page);
    },[page]);

    const { status, allProperties, totalPages, currentPage } = useSelector( state => state.properties );
    const { status:statusCategories,categories } = useSelector( state => state.categories );
    const { status:statusPrices, prices } = useSelector( state => state.prices );

    const onSubmitFilter = (event) => {
        event.preventDefault();
      }

    const startFilteringProperties = () => {

        if(kword != '' && category != '' && price != '' && startDate != null && endDate != null){
            startLoadingFilteredProperties(kword, category, price, startDate, endDate, page);
        }else{
            Swal.fire('Warning', 'All fields are required','warning');
        }

    }

    const PaginationC = ({totalPages}) => {

        const onPressPage = (event) => {
  
            setPage(event.target.innerHTML.slice(0,1)-1);
  
        }
  
        const pages = [];
  
        for (let page = 0; page < totalPages; page++) {
          pages.push(page);
          
        }
  
        return (
            pages.map(Page => {
              return (
                <Button
                    variant='contained'
                    sx={{
                        color: 'white',
                        backgroundColor: 'primary.main',
                        marginX:1
                    }}
                    onClick={onPressPage}
                    disabled={page == Page}
                    key={Page}
                >
                    {Page+1}
                </Button>
              )
            })     
        )
    }


  return (
    <>
        {
            status == 'checking' || allProperties == [] || statusCategories == 'checking' || statusPrices == 'checking'?
                <AppLayout>
                    <Checking/>
                </AppLayout>
            :
                <AppLayout>
                    <Grid
                        className="animate__animated animate__fadeIn animate__faster"
                        container
                        spacing={2}
                        sx={{
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'wrap',
                        padding:3,
                        maxWidth:1400,
                        marginX:'auto'

                        }}
                    >
                        <Grid item xs={12} marginY={1} sx={{ marginX:2 }}>
                        <Typography 
                            sx={{
                            padding:1,
                            fontSize: {xs: '40px', md: '50px'},
                            fontWeight: 600,
                            textAlign: {xs: 'center', md: 'start'} 
                            }}
                        >
                            PROPERTIES
                        </Typography>
                        </Grid>
                        <Grid
                        item
                        xs={8}
                        sx={{
                            marginX: {xs:'auto', md:0}
                        }}
                        >
                        <Typography variant="body1" sx={{color: '#919192'}}>Filter Properties</Typography>
                        <form onSubmit={onSubmitFilter}>
                            <Grid
                            container
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: {xs:'column', sm: 'row'},
                                justifyContent: 'start',
                                flexWrap: 'wrap'
                            }}
                            >
                            <Grid 
                                item 
                                sx={{ 
                                    mt: 2,
                                    width:{xs:'100%',md: '20%'},
                                    marginX: {sm: 1}
                                }}
                            >
                                <TextField
                                    label = 'Title or description'
                                    type= 'text'
                                    size="small"
                                    placeholder='Title or Description'
                                    fullWidth
                                    name='kword'
                                    onChange={onKwordChange}
                                    value={kword}
                                />
                            </Grid>
                            <Grid 
                                item 
                                sx={{ 
                                    mt: 2,
                                    width:{xs:'100%',md:'20%'},
                                    marginX: {sm: 1}
                                }}
                            >
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    size="small"
                                    fullWidth
                                    label="Category"
                                    onChange={onCategoryChange}
                                    value={category}
                                >{
                                    categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                        </MenuItem>
                                    ))
                                }
                                </TextField>
                            </Grid>
                            <Grid 
                                item 
                                sx={{ 
                                    mt: 2,
                                    width:{xs:'100%',md:'20%'},
                                    marginX: {sm: 1}
                                }}
                            >
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    size="small"
                                    fullWidth
                                    label="Price"
                                    onChange={onPriceChange}
                                    value={price}
                                >{
                                    prices.map((price) => (
                                        <MenuItem key={price.id} value={price.id}>
                                        {price.value}
                                        </MenuItem>
                                    ))
                                }
                                </TextField>
                            </Grid>
                            <Grid 
                                item 
                                sx={{ 
                                    mt: 2,
                                    width:{xs:'100%',md: '34%'},
                                    marginX: {sm: 1},
                                    display:'flex',
                                    justifyContent: {xs: 'center',  md: 'start'}
                                }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                    label="From" 
                                    size="small"
                                    onChange={onStartDateChange}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid 
                                item 
                                sx={{ 
                                    mt: 2,
                                    width:{xs:'100%',md: '45%'},
                                    marginX: {sm: 1},
                                    display:'flex',
                                    justifyContent: {xs: 'center', md: 'start'}
                                }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                    label="To" 
                                    size="small"
                                    onChange={onEndDateChange}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            </Grid>
                            <Grid 
                                container 
                                spacing={2} 
                                sx= {{ 
                                    mb: 2, 
                                    mt: 1, 
                                    display:'flex', 
                                    justifyContent:{xs: 'center', md:'start'}
                                }}
                            >
                                    <Grid item 
                                        xs={3}
                                    >
                                        <Button 
                                        type='submit' 
                                        variant='contained' 
                                        fullWidth
                                        sx={{
                                            color: 'white'
                                        }}
                                        onClick={startFilteringProperties}
                                        >
                                        Filter
                                        </Button>
                                    </Grid>
                                </Grid>
                        </form>
                        </Grid>
                        <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: {xs:'center', md:'space-between'},
                            boxShadow: 2,
                            boredrColor: 'primary.main',
                            borderRadius: 1,
                            p: 3
                        }}
                        >
                            {
                                allProperties.length > 0 ?
                                allProperties.map( property => {
                                    return (
                                        <DispaylProperty property={property} key={property.id}/>
                                    )
                                })
                                :
                                <Alert 
                                    severity="info"
                                    sx={{
                                        marginX: 'auto'
                                    }}
                                >
                                    No Matches Found
                                </Alert>
                            }
                        </Grid>
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginY: 4
                            }}
                        >
                            
                            <PaginationC totalPages={totalPages}/>

                        </Grid>
                    </Grid>
                </AppLayout>
        }
    </>
  )
}
