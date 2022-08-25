import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useParams, useNavigate } from "react-router-dom"

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RecordsUpdate from '../pages/RecordsUpdate';
import RecordsCreate from '../pages/RecordsCreate';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import useUser from '../hooks/useUser';
import PublicRoute from '../components/router/PublicRoute';
import PrivateRoute from '../components/router/PrivateRoute';
import { CREATE, LOGIN, USER } from './paths';



const AppRouter = () => {

    // const [auth, setAuth] = useState(false)
    // const { page } = useParams();
    // const navigate = useNavigate();
    // console.log(useNavigate())

    // const user = JSON.parse(sessionStorage.getItem("user"))

    // useEffect(() => {
    //     if(user && Object.keys(user).length > 0){
    //         setAuth(true)

    //     } else {
    //         setAuth(false)
    //     }
    // // }, [])
    // const auth = useUser();
    // console.log(auth)



    return (
        <div>
            <Routes>
                    <Route path="/" element={<HomePage />} />
                <Route path="/" element={<PublicRoute />}>
                    {/* <Route path="/login" element={ auth.auth === true ? <Navigate to="/" /> : <LoginPage />} /> */}
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path={LOGIN} element={<LoginPage />} />
                    {/* <Route path="/register" element={auth.auth === true ? <Navigate to="/" /> : <RegisterPage />} /> */}
                </Route>

                <Route path={USER} element={<PrivateRoute />} >
                    <Route index element={<Dashboard />} />
                    <Route path={CREATE} element={<RecordsCreate />} />
                    {/* <Route path='/private/dashboard' element={auth.auth === true ? <Dashboard /> : <Navigate to="/login" />} /> */}
                </Route>

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </div>
    )
}

export default AppRouter