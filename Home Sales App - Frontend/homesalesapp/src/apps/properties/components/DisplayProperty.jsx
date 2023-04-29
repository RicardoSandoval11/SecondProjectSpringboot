import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { CardActions } from '@mui/material';
import { Link as RoterLink } from 'react-router-dom';


export const DispaylProperty = ({property}) => {

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

  return (
    <Card sx={{ maxWidth: 345, marginX: 1, marginY:1 }}>
      <CardHeader
            avatar={
              <RoterLink to={`/user/public/details/${property.user.id}`}>
                <Avatar 
                  sx={{ bgcolor: red[500] }} 
                  aria-label="recipe" 
                  src={baseUrl+property.user.photo_url}
                >
                </Avatar>
              </RoterLink>
            }
        title={property.title.length > 32 ? property.title.slice(0,32)+'...' : property.title}
        subheader={property.location}
      />
      <CardMedia
        component="img"
        height="194"
        image={baseUrl+property.image}
        alt={property.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {property.description.length > 100 ? property.description.slice(0,200)+'...' : property.description}
        </Typography>
      </CardContent>
      <CardActions>
        <RoterLink 
          style={{
            color: '#089fff', 
            textDecoration: 'none'
          }}to={`/properties/details/${property.id}`}>
            View More
        </RoterLink>
      </CardActions>
    </Card>
  );
}