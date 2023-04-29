import { Grid } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";
import { DisplayProfilePicture } from "../components/DisplayProfilePicture";
import { ProfileActions } from "../components/ProfileActions";
import { DisplayUserProperties } from "../../properties/pages/DisplayUserProperties";
import { useUserStore } from "../../../hooks/useUserStore";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const UserDashboard = () => {

  const { startClearingMessages } = useUserStore();

  const { updateUserInformationSuccess, updateUserInformationFailed } = useSelector( state => state.users );

  //------------------ user messages

  useEffect(() => {
      if(updateUserInformationSuccess != null){
        Swal.fire('Information Updated',updateUserInformationSuccess, 'success');
        startClearingMessages();
      }
    },[updateUserInformationSuccess]);

  useEffect(() => {
      if(updateUserInformationFailed != null){
          Swal.fire('Update Information Failed',updateUserInformationFailed, 'error');
          startClearingMessages();
      }
  },[updateUserInformationFailed]);

  return (
    <AppLayout>
      <Grid
      container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 1400,
            marginX: 'auto'
        }}
        className='animate__animated animate__fadeIn animate__faster'
      >
            <DisplayProfilePicture/>
            <ProfileActions/>
            <DisplayUserProperties/>
      </Grid>
    </AppLayout>
  )
}


