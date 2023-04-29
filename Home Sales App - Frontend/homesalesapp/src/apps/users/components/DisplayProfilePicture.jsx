import { Box, Typography, Grid } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useUserStore } from "../../../hooks/useUserStore";


export const DisplayProfilePicture = () => {

    const baseUrl = import.meta.env.VITE_IMGS_BASE_URL;

    const { startLoadingDashboardUserDetails } = useUserStore();
 
    useEffect(() => {
        startLoadingDashboardUserDetails();
    },[]);

    const {privateDetalis } = useSelector( state => state.users );

  return (
    <>
        {
            privateDetalis.photo_url != undefined ?
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: {xs:'column', sm: 'row'},
                        justifyContent: {xs:'center', sm: 'space-between'},
                        alignItems: {md: 'center'},
                        m: 3,
                        padding: 3
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: { xs: '100%', sm: '50%' },
                            maxHeight: { xs: 233, sm: 167 },
                            maxWidth: { xs: 350, sm: 250 },
                            borderRadius: '100%'
                        }}
                        alt="The house from the offer."
                        src={baseUrl+privateDetalis.photo_url}
                    />
                    <Grid
                        item
                        sx={{
                            width: { xs: '100%', sm: '45%' },
                            marginLeft: 2,
                            marginTop: {xs:3, md: 0},
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: 500}}>{privateDetalis.name}</Typography>
                        <Typography variant="body1" sx={{fontWeight: 500}}>{privateDetalis.email}</Typography>
                    </Grid>
                </Grid>
            :
                <></>
        }
    </>
  )
}


