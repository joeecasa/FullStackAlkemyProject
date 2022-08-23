import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom"

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RecordsUpdate from '../pages/RecordsUpdate';
import RecordsCreate from '../pages/RecordsCreate';
import RegisterPage from '../pages/RegisterPage';


const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/records/update/:id' element={<RecordsUpdate />} />
                <Route path='/records/create' element={<RecordsCreate />} />
                <Route path="*" element={<Navigate to="login" />} />

            </Routes>
        </div>
    )
}

export default AppRouter