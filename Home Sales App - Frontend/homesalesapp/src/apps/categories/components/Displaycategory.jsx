import { Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


export const Displaycategory = ({ category }) => {


  return (
    <Grid
      item
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: 3,
        padding: 3,
        width: {xs:'100%',sm:'80%'},
        maxWidth: 800,
        mb: 2
      }}
    >
      <Typography variant='h5' sx={{display: 'block',marginY:1,fontWeight:500, width: '100%'}}>
        {category.name}
      </Typography>
      <Typography sx={{display: 'block',mt:1,mb:2, width:'100%'}}>
        {`Number of Properties: ${category.propertiesNumber}`}
      </Typography>
      <RouterLink
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          color: '#089fff'
        }}
        to={`/properties/filter-category/${category.id}`}
      >
        View Related Properties
      </RouterLink>
    </Grid>
  )
}


