import React from 'react'
import { useCustomFetchRecords } from '../hooks/useCustomFetchRecords'
import {useAuthContext} from "../context/authContext"
import { useState } from 'react'
import { useEffect } from 'react'

const Dashboard = () => {
  const { dataRecords, isloadingRecors } = useCustomFetchRecords("http://localhost:3001/records/list")
  const { data } = !!dataRecords && dataRecords;
  // console.log(data)
  const { isAuthenticated ,logout } = useAuthContext();



  return (
    <div>
<h1>Dashboard

</h1>


  </div>
  )
  }
export default Dashboard