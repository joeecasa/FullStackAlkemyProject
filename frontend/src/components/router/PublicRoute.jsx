import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import {useAuthContext} from "../../context/authContext"
import { USER } from '../../routes/paths';


const PublicRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if(isAuthenticated){
        return <Navigate to={USER} />
    }

  return (
    <div>
    <Outlet />
    </div>
  )
}

export default PublicRoute