import { Grid, CircularProgress } from "@mui/material";
import { AppLayout } from "../layout/AppLayout";


export const Checking = () => {
  return (
      <Grid
        container
        sx={{
            maxWidth: 1400,
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <Grid 
            item
            sx={{
              display: 'flex',
              justifyContent:'center'
            }}
        >
            <CircularProgress color='warning'/>
        </Grid>
      </Grid>
  )
}


