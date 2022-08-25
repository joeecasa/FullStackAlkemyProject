import React, { useState } from 'react'
import { useEffect } from 'react';
import { AuthContextProvider } from '../context/authContext';
import UserContext from '../context/userContext';
import HomePage from '../pages/HomePage';
import AppRouter from '../routes/AppRouter';
import MainNav from './MainNav';




const App = () => {

  // const userSessionStorage = JSON.parse(sessionStorage.getItem("user"))
  // const [userData, setUserdata] = useState({})

  // useEffect(() => {
  //   if (userSessionStorage && Object.keys(userSessionStorage).length > 0) {
  //     setUserdata({
  //       auth: true
  //     })
  //   } else {
  //     setUserdata({
  //       auth: false
  //     })

  //   }
  // }, [])

  // const userData = {
  //   email : userLocalStorage.email,
  //   id : userLocalStorage.id
  // }


  return (
    // <UserContext.Provider value={userData}>
    <AuthContextProvider >



        <MainNav />
        <AppRouter />
      
      {/* </UserContext.Provider> */}
    </AuthContextProvider>
  )
}

export default App