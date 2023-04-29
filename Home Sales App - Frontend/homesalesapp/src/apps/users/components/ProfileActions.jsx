import { Grid, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { usePropertiesStore } from "../../../hooks/usePropertiesStore";


export const ProfileActions = () => {

    const navigate = useNavigate();

    const { startExportingUserData } = usePropertiesStore();

    const redirectEditMyInformation = () => {

        navigate('/user/update-information');

    }

    const redirectAddProperty = () => {

        navigate('/properties/create');

    }

    const redirectExportProperties = () => {

        startExportingUserData();

    }

  return (
    <Grid
        item
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: {xs:'column', sm: 'row'},
            justifyContent: {xs:'center', sm: 'space-between'},
            alignItems: {md: 'center'},
            m: 3,
            padding: 3
        }}
    >
        <Grid item sx={{ m: 1, width:{xs:'100%', md: '30%'} }}>
            <Button
                label='Password'
                variant='contained'
                placeholder='Password'
                type='submit'
                fullWidth
                sx={{color:'white'}}
                onClick={redirectEditMyInformation}
            >
                My Information
            </Button>
        </Grid>
        <Grid item sx={{ m: 1, width:{xs:'100%', md: '30%'} }}>
            <Button
                label='Password'
                variant='contained'
                placeholder='Password'
                type='submit'
                fullWidth
                sx={{color:'white'}}
                onClick={redirectAddProperty}
            >
                Add Property
            </Button>
        </Grid>
        <Grid item sx={{ m: 1, width:{xs:'100%', md: '30%'} }}>
            <Button
                label='Password'
                variant='contained'
                placeholder='Password'
                type='submit'
                fullWidth
                sx={{color:'white'}}
                onClick={redirectExportProperties}
            >
                Export Data
            </Button>
        </Grid>
    </Grid>
  )
}

