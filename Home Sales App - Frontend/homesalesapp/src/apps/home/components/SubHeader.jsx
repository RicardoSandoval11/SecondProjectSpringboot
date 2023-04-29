import { Grid, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SubHeader = () => {

    const { status } = useSelector( state => state.auth );

    const navigate = useNavigate();

    const redirectALlProperties = () => {

        navigate('/properties/all-properties');
        
    }

    const redirectAllCategories = () => {

        navigate('/categories/all');

    }

    const redirectCreateProperty = () => {
        if(status == 'authenticated'){
            navigate('/properties/create');
        }else{
            Swal.fire('Account Is Required', 'Create an account to publish your property', 'info');
        }
    }

  return (
    <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: 3,
            border: 1,
            borderColor: '#E2DFDF',
            padding: 3,
            boxShadow: 2,
        }}
    >
      <Grid 
        item
        xs={12}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 1,
            borderRadius: '5px',
            mb: 2
        }}
    >
        <Typography 
            variant='h4' 
            sx={{color: 'black', fontWeight: 600}}
        >
            HOME SALES APP
        </Typography>
      </Grid>
      <Grid 
        item
        xs={12}
        sm={6}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 1,
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: '5px',
            maxWidth: 'fit-content',
            mb: 2
        }}
    >
        <Typography 
            variant='subtitle1' 
            sx={{color: 'black', fontWeight: 600}}
        >
            Guatemala Real Estate Professionals
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'

        }}
      >
        <Grid item xs={12} lg={3} sx={{marginX: 1}}>
            <Button
                size="medium"
                color="inherit"
                sx={{
                    color: 'white',
                    backgroundColor: 'primary.main',
                    marginY: 1,
                    width: '100%',
                    '&:hover':{
                        color: 'black'
                    }
                }}
                onClick={redirectALlProperties}
                >
                <SearchIcon /> 
                <Typography variant='body1' sx={{fontWeight:500}}>
                    PROPERTIES FOR SALE
                </Typography>
            </Button>
        </Grid>
        <Grid item xs={12} lg={3} sx={{marginX: 1}}>
            <Button
                size="medium"
                color="inherit"
                sx={{
                    color: 'white',
                    backgroundColor: 'primary.main',
                    marginY: 1,
                    width: '100%',
                    '&:hover':{
                        color: 'black'
                    }
                }}
                onClick={redirectAllCategories}
                >
                <SearchIcon /> 
                <Typography variant='body1' sx={{fontWeight:500}}>
                    CATEGORIES
                </Typography>
            </Button>
        </Grid>
        <Grid item xs={12} lg={3} sx={{marginX: 1}}>
            <Button
                size="medium"
                color="inherit"
                sx={{
                    color: 'white',
                    backgroundColor: 'primary.main',
                    width: '100%',
                    marginY: 1,
                    '&:hover':{
                        color: 'black'
                    }
                }}
                onClick={redirectCreateProperty}
                >
                <HomeIcon /> 
                <Typography variant='body1' sx={{fontWeight:500}}>
                    SALE YOUR PROPERTY
                </Typography>
            </Button>

        </Grid>
      </Grid>
    </Grid>
  )
}

