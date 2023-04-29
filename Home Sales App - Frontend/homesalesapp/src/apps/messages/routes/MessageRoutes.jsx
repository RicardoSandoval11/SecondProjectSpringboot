import { Routes, Route, Navigate } from "react-router-dom"
import { MessagesPage } from "../pages/MessagesPage"


export const MessageRoutes = () => {
  return (
    <Routes>
      {/* BASE URL: /messages/ */}
      <Route path='my-messages/' element={<MessagesPage/>}/>

      {/* DEFAULT URL */}
      <Route path='*' element={<Navigate to='my-messages/'/>}/>
    </Routes>
  )
}


