import React from 'react'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {
  const navigate = useNavigate()
  const onClickLogin = ()=>{
    navigate("/login", { replace: true })
  }
  const onClickRegister = ()=>{
    navigate("/register", { replace: true })
  }

  return (
    <div className='m-2 text-center mt-5'>

      <h1>Welcome to Finance App</h1>
      <p className='fs-3 text-'>
        If you want to start using, please login.</p>
      <div className='mt-5'>
        <button className='btn btn-outline-dark me-2'
        onClick={onClickLogin}
        >Login</button>
        <button className='btn btn-outline-dark'
        onClick={onClickRegister}
        >Register</button>
      </div>

    </div>
  )
}

export default HomePage