import { useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from "../../../ui/Checking";
import { Displaycategory } from "../components/Displaycategory";
import { useCategoryStore } from "../../../hooks/useCategoryStore";


export const AllCategories = () => {

  const { startloadingAllCategories } = useCategoryStore();

  useEffect(() => {
    startloadingAllCategories();
  },[]);

  const { status, categories } = useSelector( state => state.categories );


  return (
    <AppLayout>
          {
            status == 'checking' || categories == null?
              <Checking/>
            :
              <Grid
                  container
                  className="animate__animated animate__fadeIn animate__faster"
                  spacing={2}
                  sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      maxWidth: 1400,
                      marginX: 'auto'
                  }}
              >
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginY:2,
                    width: '100%'
                  }}
                >
                  <Typography variant='h4' sx={{fontWeight:600}}>All Categories</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%'
                  }}
                >
                  {
                    categories.map(category => {
                      return(
                        <Displaycategory category={category} key={category.id}/>
                      )
                    })
                  }
                </Grid>
              </Grid>
          }
    </AppLayout>
  )
}


