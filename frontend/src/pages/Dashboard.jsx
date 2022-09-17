import React from 'react'
import { useCustomFetchRecords } from '../hooks/useCustomFetchRecords'
import { useAuthContext } from "../context/authContext"
import { useState } from 'react'
import { useEffect } from 'react'
import RecordCard from '../components/RecordCard'
import Resumecard from '../components/Resumecard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("user"))
  const userId = user.id
  // const { dataRecords, isloadingRecors } = useCustomFetchRecords(`https://backendalkemy.herokuapp.com/records/list/${userId}`)
  const { dataRecords, isloadingRecors } = useCustomFetchRecords(`http://localhost:3001/records/list/${userId}`)
  const { data } = !!dataRecords && dataRecords;
  const [records, setRecords] = useState()

  useEffect(() => {
    if (data) {
      setRecords(data)
    }
  }, [data])

  const onClickNewRecord = () => {
    navigate("/user/dashboard/records/create")

  }
  return (
    <div className='m-3 div-dash'>
      <h1 className='text-center mb-3 dash-title'>Personal finances

      </h1>
      <Resumecard
        records={records}
      />
      {
        records && records.length > 0 ?
          (
            <div className=' card-container'>
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
            isloadingRecors === true ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
              :
              (
                <>
                  <div
                    className='m-5 fs-4 text-center'
                  >You do not have records</div>
                  <div className='text-center'>

                    <button
                      className='btn btn-outline-dark m-5 fs-4'
                      onClick={onClickNewRecord}
                    >Create New Record</button>
                  </div>
                </>
              )
          )
      }


    </div>
  )
}
export default Dashboard