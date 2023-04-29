import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<HomePage/>} />
      <Route path='/*' element={<Navigate to='/'/>} />
    </Routes>
  )
}


