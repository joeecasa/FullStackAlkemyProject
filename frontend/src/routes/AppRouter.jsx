import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom"

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RecordsUpdate from '../pages/RecordsUpdate';
import RecordsCreate from '../pages/RecordsCreate';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import PublicRoute from '../components/router/PublicRoute';
import PrivateRoute from '../components/router/PrivateRoute';
import { CREATE, EXPENSE, INCOME, LOGIN, UPDATE, USER } from './paths';
import RecordsIncome from '../pages/RecordsIncome';
import RecordsExpense from '../pages/RecordsExpense';
import { useState } from 'react';



const AppRouter = () => {
    

      
    
     

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage  />} />
                <Route path="/" element={<PublicRoute />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path={LOGIN} element={<LoginPage />} />
                </Route>

                <Route path={USER} element={<PrivateRoute />} >
                    <Route index element={<Dashboard />} />
                    <Route path={CREATE} element={<RecordsCreate />} />
                    <Route path={UPDATE} element={<RecordsUpdate />} />
                    <Route path={INCOME} element={<RecordsIncome />} />
                    <Route path={EXPENSE} element={<RecordsExpense />} />

                </Route>

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </div>
    )
}

export default AppRouter