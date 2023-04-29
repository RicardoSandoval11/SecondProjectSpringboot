import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DisplayAllProperties } from '../pages/DisplayAllProperties';
import { DisplayPropertyDetails } from '../pages/DisplayPropertyDetails';
import { PropertiesByCategory } from '../pages/PropertiesByCategory';
import { EditProperty } from '../pages/EditProperty';
import { CreateProperty } from '../pages/CreateProperty';

export const PropertyRoutes = () => {

  const { status } = useSelector( state => state.auth );

  return (
    <Routes>
        {/* BASE URL: /properties/ */}
        <Route path='all-properties' element={<DisplayAllProperties/>}/>
        <Route path='details/:id' element={<DisplayPropertyDetails/>}/>
        <Route path='filter-category/:id' element={<PropertiesByCategory/>}/>
        {
          status == 'authenticated' ?
            <>
              <Route path='edit/:propertyId' element={<EditProperty/>}/>
              <Route path='create' element={<CreateProperty/>}/>
            </>
          :
            <></>
        }

        {/* DEFAULT URL */}
        <Route path='/*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

