import React, { useState } from 'react'
import { AuthContextProvider } from '../context/authContext';
import AppRouter from '../routes/AppRouter';
import MainNav from './MainNav';




const App = () => {

 

  return (
    <AuthContextProvider >
        <MainNav />
        <AppRouter />
    </AuthContextProvider>
  )
}

export default App