import React from 'react'
import { useCustomFetchRecords } from '../hooks/useCustomFetchRecords'
import { useAuthContext } from "../context/authContext"
import { useState } from 'react'
import { useEffect } from 'react'
import RecordCard from '../components/RecordCard'
import Resumecard from '../components/Resumecard'

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  const userId = user.id
  const { dataRecords, isloadingRecors } = useCustomFetchRecords(`https://backendalkemy.herokuapp.com/records/list/${userId}`)
  const { data } = !!dataRecords && dataRecords;
  const [records, setRecords] = useState()

  useEffect(() => {
    if (data) {
      setRecords(data)
    }
  }, [data])

  // console.log(records)
  
  return (
    <div className='m-3'>
      <h1 className='text-center mb-3'>My Personal finances

      </h1>
      <Resumecard 
      records={records}
      />
      {
        records ?
          (
            <div className='container card-container'>
              {
                records.map(record => {
                  return (
                    <RecordCard 
                    key={record.id}
                    amount={record.amount}
                    concept={record.concept}
                    id={record.id}
                    tipe={record.tipe}
                    category={record.categories.name}
                    created={record.created_at}
                    />
                  )
                })
              }
            </div>

          )
          :
          (
            <div>
              No existen registros de este usuario
            </div>
          )
      }


    </div>
  )
}
export default Dashboard