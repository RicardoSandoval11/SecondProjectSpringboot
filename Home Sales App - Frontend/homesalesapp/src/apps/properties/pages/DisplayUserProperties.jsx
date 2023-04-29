import { useEffect, useState } from "react";

import { Grid, Button, Alert } from "@mui/material";

import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from "../../../ui/Checking";
import { DispaylUserProperty } from "../components/DisplayUserProperty";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore";
import { useSelector } from "react-redux";


export const DisplayUserProperties = () => {

    const { startLoadingUserProperties } = usePropertiesStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingUserProperties(page);
    },[page]);

    const { status, userProperties, totalPages } = useSelector( state => state.properties );

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
        status == 'checking' || (userProperties.length == 0 && totalPages == null) ?
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
                padding: 3,
                m: 1,
                mt: 2,
                marginBottom: 4,
                maxWidth: 1400,
                marginX:'auto',
                flexWrap: 'wrap'
            }}
            className='animate__animated animate__fadeIn animate__faster'
            >
              {
                  userProperties.length > 0 ?
                  userProperties.map( property => {
                      return (
                          <DispaylUserProperty property={property} key={property.id}/>
                      )
                  })
                  :
                  <Alert severity="info" sx={{alignSelf: 'center'}}>You Don't Have Properties Yet</Alert>
              }
              <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginY: 2
                }}
              >
              
                <PaginationC totalPages={totalPages}/>

              </Grid>
          </Grid>
        </>
        }
    </>
  )
}


