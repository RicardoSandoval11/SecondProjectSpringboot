import { Grid } from "@mui/material";

import {AppLayout} from "../../../layout/AppLayout";
import { LastCreatedSection } from "../components/LastCreatedSection";
import { LastDepartmentSection } from "../components/LastDepartmentsSection";
import { LastOtherSection } from "../components/LastOtherSection";
import { SubHeader } from "../components/SubHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { usePropertiesStore } from "../../../hooks/usePropertiesStore";


export const HomePage = () => {

  const { startClearingMessages } = usePropertiesStore();

  const { 
      createPropertySuccess, 
      createPropertyFailed, 
      updatePropertySuccess, 
      updatePropertyFailed, 
      successRemovePropertyMsg, 
      failedRemovePropertyMsg } = useSelector( state => state.properties );
  
  //-------------------- Create property

  useEffect(() => {
    if(createPropertySuccess != null){
      Swal.fire('Property Created', createPropertySuccess, 'success');
      startClearingMessages();
    }
  },[createPropertySuccess]);

  useEffect(() => {
    if(createPropertyFailed != null){
      Swal.fire('Property Create Failed', createPropertyFailed, 'error');
      startClearingMessages();
    }
  },[createPropertyFailed]);

  //--------------------- Update property

  useEffect(() => {
    if(updatePropertySuccess != null){
      Swal.fire('Property Updated', updatePropertySuccess, 'success');
      startClearingMessages();
    }
  },[updatePropertySuccess]);

  useEffect(() => {
    if(updatePropertyFailed != null){
      Swal.fire('Property Update Failed', updatePropertyFailed, 'error');
      startClearingMessages();
    }
  },[updatePropertyFailed]);

  //--------------------------- Remove property

  useEffect(() => {
      if(successRemovePropertyMsg != null){
          Swal.fire('Property Removed',successRemovePropertyMsg, 'success');
          startClearingMessages();
      }
  },[successRemovePropertyMsg]);

  useEffect(() => {
      if(failedRemovePropertyMsg != null){
          Swal.fire('Remove Failed',failedRemovePropertyMsg, 'error');
          startClearingMessages();
      }
  },[failedRemovePropertyMsg]);

    
  return (
    <AppLayout>
      <Grid
        container
        className='animate__animated animate__fadeIn animate__faster'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 1500,
          marginX: 'auto'
        }}
      >

        {/* Subsection */}
        <SubHeader/>

        {/* Last Houses Created Section */}
        <LastCreatedSection/>

        {/* Last Departments Created Section */}
        <LastDepartmentSection/>

        {/* Other Properties Recently Created Section */}
        <LastOtherSection/>
        
      </Grid>
    </AppLayout>
  )
}

