import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { RecoverPassword } from "../pages/RecoverPassword"
import { UpdatePassword } from "../pages/UpdatePassword"


export const AuthenticatationRoutes = () => {
  return (
      <Routes>
        {/* Base URL: /auth */}

        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='recover-password' element={<RecoverPassword/>}/>
        <Route path='update-password/:code' element={<UpdatePassword/>}/>
      
        {/* Default url */}
        <Route path='*' element={<Navigate to='login'/>}/>

    </Routes>
  )
}

