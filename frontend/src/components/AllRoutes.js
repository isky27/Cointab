import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Users from '../pages/Users'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>Home</Route>
      <Route path='/users' element={<Users/>}>Home</Route>
    </Routes>
  )
}

export default AllRoutes
