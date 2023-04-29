import { Box } from "@mui/system";
import { Header } from "../includes/Header";
import { useMessageStore } from '../hooks/useMessageStore';
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const AppLayout = ({children}) => {

  const { status } = useSelector( state => state.auth );

  const { numberOfMessages } = useSelector( state => state.messages );

  const { startLoadingNumberOfMessages } = useMessageStore();

  useEffect(() => {
    if (status == 'authenticated') {
      startLoadingNumberOfMessages();
    }
  },[numberOfMessages]);

  return (
    <Box
        sx={{display:'flex', flexWrap:'wrap'}}
    >
        {/* Header */}
        <Header/>

        {/* Content */}
        <Box 
            component='main'
            sx={{ flexGrow: 1 }}
        >
            { children }
        </Box>
      
    </Box>
  )
}

