import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import useUser from '../hooks/useUser';
import {useAuthContext} from "../context/authContext"
import { CREATE } from '../routes/paths';



const MainNav = () => {
  // const auth = useUser();
const { isAuthenticated ,logout } = useAuthContext();
 

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
console.log(isAuthenticated)
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className='nav-item'>
              <NavLink className="nav-link" to="/">Home</NavLink>

            </li>
            {
              !isAuthenticated  ?
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
                    <NavLink className="nav-link" to={CREATE}>Create New Record</NavLink>

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
                    <button className="btn btn-outline-info"
                      onClick={onClickLogout}

                    >logout</button>

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