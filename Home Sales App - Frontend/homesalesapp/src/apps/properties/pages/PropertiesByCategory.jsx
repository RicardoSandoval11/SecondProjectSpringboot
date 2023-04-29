import { useEffect, useState } from "react";

import { Grid, Button, Alert } from "@mui/material";
import { useParams } from "react-router-dom";

import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from "../../../ui/Checking";
import { DispaylProperty } from "../components/DisplayProperty";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore";
import { useSelector } from "react-redux";


export const PropertiesByCategory = () => {

    const { id } = useParams();

    const { startLoadingPropertiesByCategory } = usePropertiesStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
      startLoadingPropertiesByCategory(id, page);
    },[page]);

    const { status, propertiesByCategory, totalPages } = useSelector( state => state.properties );

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
    <AppLayout>
      {
        status == 'checking' || (propertiesByCategory.length == 0 && totalPages == null) ?
          <Checking/>
        :
        <>
            <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: {xs:'center', md:'space-between'},
                boxShadow: 2,
                boredrColor: 'primary.main',
                borderRadius: 1,
                p: 3,
                m: 1,
                maxWidth: 1400,
                marginX:'auto',
                flexWrap: 'wrap'
            }}
            className='animate__animated animate__fadeIn animate__faster'
            >
              {
                  propertiesByCategory.length > 0 ?
                  propertiesByCategory.map( property => {
                      return (
                          <DispaylProperty property={property} key={property.id}/>
                      )
                  })
                  :
                  <Alert severity="info">No Matches Found</Alert>
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
        </>
        }
    </AppLayout>
  )
}


