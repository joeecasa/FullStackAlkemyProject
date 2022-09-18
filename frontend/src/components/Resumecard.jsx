import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./componentsStyles.css"


const Resumecard = ({ records }) => {
    const [suma, setSuma] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        if (records) {
            const sumall = records.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
            setSuma(sumall)
        }
    }, [records])

const onCreateNew = ()=>{
    navigate("/user/dashboard/records/create")
}
const onBtnExpense = ()=>{
    navigate(`/user/dashboard/records/expense`)
}

const onBtnIncome = ()=>{
    navigate(`/user/dashboard/records/income`)
}
const [colorTotal, setColorTotal] = useState({
    "color":"green",
  })

useEffect(() => {
 
    if(suma > 0){
        setColorTotal({
            "color":"#198754",
          })
    } else if(suma === 0){
        setColorTotal({
            "color":"black",
          })
    }
     else{
        setColorTotal({
            "color":"#dc3545",
          })
    }
}, [suma])
    return (
        <div className='mt-3 mb-3 text-center resume-card-div'>
            <div className='text-center balance'>Total balance <span className='text-center total ms-4' style={colorTotal}>$ {suma}</span></div>
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
                className='btn btn-outline-danger btn-list btn-expense'
                onClick={onBtnExpense}
                
                >
                    Expense Records

                </button>
            </div>

        </div>
    )
}

export default Resumecard