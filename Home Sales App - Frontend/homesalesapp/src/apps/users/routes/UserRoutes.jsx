import { Navigate, Route, Routes } from "react-router-dom";
import { PublicProfile } from "../pages/PublicProfile";
import { NotFound } from "../../../ui/NotFound";
import { useSelector } from "react-redux";
import { UserDashboard } from "../pages/UserDashboard";
import { UpdateInformation } from "../pages/UpdateInformation";

export const UserRoutes = () => {

  const { status } = useSelector( state => state.auth );

  return (
    <Routes>

        {/* BASE URL /user/ */}
        <Route path='public/details/:id' element={<PublicProfile/>}/>
        <Route path='not-found' element={<NotFound/>}/>
        {
          status == 'authenticated'?
          <>
              <Route path='update-information' element={<UpdateInformation/>}/>
              <Route path='dashboard' element={<UserDashboard/>}/>
            </>
          :
            <></>
        }
        {/* DEFAULT URL */}
        <Route path='*' element={<Navigate to='not-found'/>}/>
    </Routes>
  )
}


