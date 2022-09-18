import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext"
import "./componentsStyles.css"
import logo from './logo.png';



const MainNav = () => {
  const { isAuthenticated, logout } = useAuthContext();


 
  const onClickLogout = () => {
    logout()

  }
 
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" >
      <div className="container-fluid main-nav-container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <img src={logo} className="App-logo" alt="logo" />

            </li>
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