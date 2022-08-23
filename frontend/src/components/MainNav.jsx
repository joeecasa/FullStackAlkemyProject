import React from 'react'
import { NavLink } from "react-router-dom";


const MainNav = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className='nav-item'>
              <NavLink className="nav-link" to="/">Home</NavLink>

            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/register">Register</NavLink>

            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/login">Login</NavLink>

            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/records/create">Create New Record</NavLink>

            </li>


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MainNav