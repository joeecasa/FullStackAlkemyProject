import React, { useEffect } from 'react'
import { useState } from 'react'
import RecordCard from '../components/RecordCard'
import { useCustomFetchExpenseRecords } from '../helpers/useCustomFetchExpenseRecords'
import { useNavigate } from 'react-router-dom'


const RecordsExpense = () => {
    const navigate = useNavigate()


    const user = JSON.parse(sessionStorage.getItem("user"))
    const userId = user.id
    const { dataExpenseRecords,isLoadingExpenseRecords } = useCustomFetchExpenseRecords(`https://backendalkemy.herokuapp.com/records/expense/${userId}`)
    // const { dataExpenseRecords, isLoadingExpenseRecords } = useCustomFetchExpenseRecords(`http://localhost:3001/records/expense/${userId}`)
    const { data } = !!dataExpenseRecords && dataExpenseRecords;
    const [records, setRecords] = useState()

    const onClickNewRecord = () => {
        navigate("/user/dashboard/records/create")

    }
    const onCreateNew = ()=>{
        navigate("/user/dashboard/records/create")
    }
    const onBtnDashboard = ()=>{
        navigate(`/user/dashboard`)
    }
    
    const onBtnIncome = ()=>{
        navigate(`/user/dashboard/records/income`)
    }

    useEffect(() => {
        if (data) {
            setRecords(data)
        }
    }, [data])
    return (
        <div>
            <h1
                className='text-center mb-5 mt-3'>Expense Records</h1>
                <div className='container-btn'>
                <button
                onClick={onBtnIncome}
                className='btn btn-outline-success btn-list btn-income'
                >
                    Income Records

                </button>
                <button
                className='btn btn-outline-primary btn-list btn-new'
                onClick={onCreateNew}
                
                >
                    New Record

                </button>
                <button
                className='btn btn-outline-dark btn-list btn-expense'
                onClick={onBtnDashboard}
                
                >
                    Dashboard 

                </button>
            </div>
            {
                records && records.length > 0 ?
                    (
                        <ul>
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
                        </ul>

                    )
                    :
                    (
                        isLoadingExpenseRecords === true ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) :
                            (
                                <>
                                    <div
                                        className='m-5 fs-4 text-center'
                                    >You do not have expense records</div>
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

export default RecordsExpense