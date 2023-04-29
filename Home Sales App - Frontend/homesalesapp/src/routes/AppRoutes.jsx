import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { AuthenticatationRoutes } from "../apps/authentication/routes/AuthenticatationRoutes";
import { CategoriesRoutes } from "../apps/categories/routes/CategoriesRoutes";
import { HomeRoutes } from "../apps/home/routes/HomeRoutes";
import { MessageRoutes } from "../apps/messages/routes/MessageRoutes";
import { PropertyRoutes } from "../apps/properties/routes/propertyRoutes";
import { useAuthStore } from "../hooks/useAuthStore";
import { UserRoutes } from "../apps/users/routes/UserRoutes";

export const AppRoutes = () => {

  const { status, startCheckingToken } = useAuthStore();

  useEffect(() => {
    startCheckingToken();
  },[]);

  return (
    <Routes>
        <Route path='/auth/*' element={<AuthenticatationRoutes/>}/>
        <Route path='/categories/*' element={<CategoriesRoutes/>}/>
        <Route path='/properties/*' element={<PropertyRoutes/>}/>
        <Route path='/user/*' element={<UserRoutes/>}/>
        <Route path='/*' element={<HomeRoutes/>}/>
        {
          status == 'authenticated' ?
            <Route path='/messages/*' element={<MessageRoutes/>}/>
          :
            <></>
        }
    </Routes>
  )
}

