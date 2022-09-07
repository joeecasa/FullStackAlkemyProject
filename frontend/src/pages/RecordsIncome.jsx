import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecordCard from '../components/RecordCard'
import { useCustomFetchIncomeRecords } from '../helpers/useCustomFetchIncomeRecords'



const RecordsIncome = () => {
    const navigate = useNavigate()

    const user = JSON.parse(sessionStorage.getItem("user"))
    const userId = user.id
    const { dataIncomeRecords, isLoadingIncomeRecords } = useCustomFetchIncomeRecords(`https://backendalkemy.herokuapp.com/records/income/${userId}`)
    // const { dataIncomeRecords, isLoadingIncomeRecords } = useCustomFetchIncomeRecords(`http://localhost:3001/records/income/${userId}`)
    const { data } = !!dataIncomeRecords && dataIncomeRecords;
    const [records, setRecords] = useState()


    useEffect(() => {
        if (data) {
            setRecords(data)
        }
    }, [data])

    const onClickNewRecord = () => {
        navigate("/user/dashboard/records/create")

    }
    const onBtnExpense = () => {
        navigate(`/user/dashboard/records/expense`)
    }
    const onCreateNew = () => {
        navigate("/user/dashboard/records/create")
    }
    const onBtnDashboard = () => {
        navigate(`/user/dashboard`)
    }

    return (
        <div>
            <h1 className='text-center mb-5 mt-3'>Income Records</h1>
            
                
                <div className='container-btn'>
                    <button
                        onClick={onBtnExpense}
                        className='btn btn-outline-danger btn-list btn-income'
                    >
                        Expense Records

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
                            isLoadingIncomeRecords === true ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) :
                                (
                                    <>
                                        <div
                                            className='m-5 fs-4 text-center'
                                        >You do not have income records</div>
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

            export default RecordsIncome