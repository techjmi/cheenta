import React, { useContext } from 'react'
import { DataContext } from '../context/Dataprovider'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const { currentUser } = useContext(DataContext)
    return currentUser ? <Outlet /> : <Navigate to='/signin'/>
  
}

export default PrivateRoute