import React from 'react'
import HomePage from '../pages/HomePage';
import AppRouter from '../routes/AppRouter';
import MainNav from './MainNav';


const App = () => {
  return (
    <div>
    <MainNav/>
    <HomePage /> 



      <AppRouter />
    </div>
  )
}

export default App