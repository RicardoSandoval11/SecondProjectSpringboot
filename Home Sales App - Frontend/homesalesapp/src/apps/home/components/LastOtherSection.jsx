import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore"
import { DispaylProperty } from "../../properties/components/DisplayProperty";


export const LastOtherSection = () => {

    const { startLoadingLastCreatedOther } = usePropertiesStore();

    useEffect(() => {
        startLoadingLastCreatedOther();
    },[]);

    const { status, lastCreatedOther } = useSelector( state => state.properties );

  return (
    <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}
    >
        <Grid
            item
            sx={{
                display: 'flex',
                justifyContent: {xs:'center',md:'start'},
                m: {md:3},
                width: '100%'
            }}
        >
            <Typography variant='h5' sx={{ fontStyle: 'italic' }}>
                Other Properties Recently Added
            </Typography>
        </Grid>
        {
            lastCreatedOther.map( property => {
                return (
                    <DispaylProperty property={property} key={property.id}/>
                )
            })
        }
    </Grid>
  )
}

