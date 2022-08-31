import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import useUser from '../hooks/useUser';
import { useAuthContext } from "../context/authContext"
import { CREATE, UPDATE } from '../routes/paths';
import "./componentsStyles.css"




const MainNav = () => {
  // const auth = useUser();
  const { isAuthenticated, logout } = useAuthContext();


  //   const user = JSON.parse(sessionStorage.getItem("user"))
  //   // const [auth, setAuth] = useState()

  // // console.log(auth)
  const onClickLogout = () => {
    logout()

  }
  // console.log(auth)
  // useEffect(() => {
  //   if (user && Object.keys(user).length) {
  //     setAuth(true)

  //   } else {
  //     setAuth(false)
  //   }

  // // }, []);
  // console.log(auth)
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              !isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to="/">Home</NavLink>

                  </li>
                )
                :
                (
                  <></>

                )
            }

            {
              !isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to="/register">Register</NavLink>

                  </li>
                )
                :
                (
                  <></>

                )
            }

            {
              !isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to="/login">Login</NavLink>

                  </li>
                )
                :
                (
                  <></>

                )
            }



            
            {
              isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to="/user/dashboard">Dashboard</NavLink>

                  </li>
                )
                :
                (
                  <></>

                )
            }
            {
              isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to={CREATE}>New Record</NavLink>

                  </li>
                )
                :
                (
                  <></>

                )
            }
            {
              isAuthenticated ?
                (
                  <li className='nav-item'>
                    <NavLink className="nav-link" to=""
                      onClick={onClickLogout}
                    
                    >Logout</NavLink>
                    

                  </li>
                )
                :
                (
                  <></>

                )
            }



          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MainNav