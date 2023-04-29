import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore"
import { DispaylProperty } from "../../properties/components/DisplayProperty";


export const LastDepartmentSection = () => {

    const { startLoadingLastCreatedDepartments } = usePropertiesStore();

    useEffect(() => {
        startLoadingLastCreatedDepartments();
    },[]);

    const { status, lastCreatedDepartments } = useSelector( state => state.properties );

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
                Last Departments Added
            </Typography>
        </Grid>
        {
            lastCreatedDepartments.map( property => {
                return (
                    <DispaylProperty property={property} key={property.id}/>
                )
            })
        }
    </Grid>
  )
}

