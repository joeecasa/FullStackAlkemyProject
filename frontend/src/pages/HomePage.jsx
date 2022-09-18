import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./pages.css"



const HomePage = () => {
  const navigate = useNavigate()
  const onClickLogin = ()=>{
    navigate("/login", { replace: true })
  }
  const onClickRegister = ()=>{
    navigate("/register", { replace: true })
  }
 
  return (
    <div className=' text-center div-home'>

      <h1 className='home-title'>Welcome to Alkemy Finance App</h1>
      <p className='fs-1 text-'>
        Please login to start</p>
      <div className='mt-5'>
        <button className='btn btn-outline-secondary me-2 btn-home'
        onClick={onClickLogin}
        >Login</button>
        <button className='btn btn-outline-dark btn-home'
        onClick={onClickRegister}
        >Register</button>
      </div>

    </div>
  )
}

export default HomePage