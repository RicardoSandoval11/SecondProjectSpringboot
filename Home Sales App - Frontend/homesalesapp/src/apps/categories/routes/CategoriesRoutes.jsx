import { Routes, Route, Navigate } from "react-router-dom";

import { AllCategories } from "../pages/AllCategories";


export const CategoriesRoutes = () => {
  return (
    <Routes>
      {/* BASE URL /categories/ */}
      <Route path='all' element={<AllCategories/>}/>

      {/* DEFAULT URL */}
      <Route path='*' element={<Navigate to='all'/>}/>
    </Routes>
  )
}

