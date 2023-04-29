import { useEffect, useState } from "react";

import { Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useMessageStore } from "../../../hooks/useMessageStore";

import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from "../../../ui/Checking";
import { DisplayMessage } from "../components/DisplayMessage";

export const MessagesPage = () => {

    const { startLoadingUserMessages } = useMessageStore();

    const [page, setPage] = useState(0);
    
    useEffect(() => {
        startLoadingUserMessages(page);
    },[page]);

    const { userMessages, status, totalPages } = useSelector( state => state.messages );


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
      <Grid
        container
        sx={{
            display: 'flex',
            maxWidth: 1400,
            marginX: 'auto'
        }}
      >
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                marginX: 'auto',
                maxWidth: 800
            }}
        >
            {
                status == 'completed' ? 
                    <>
                        {
                            userMessages.map((message) => {
                                return (
                                    <DisplayMessage key={message.id} message={message}/>
                                )
                            })
                        }

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
                :
                <Checking/>
            }
        </Grid>
      </Grid>
    </AppLayout>
  )
}


