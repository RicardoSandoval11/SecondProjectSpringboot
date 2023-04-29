import { Grid, Alert } from '@mui/material';
import { AppLayout } from '../layout/AppLayout';


export const NotFound = () => {
  return (
    <AppLayout>
      <Grid
        container
        sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <Alert severity="info">Not Found</Alert>
      </Grid>
    </AppLayout>
  )
}


