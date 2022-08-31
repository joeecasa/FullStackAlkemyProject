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


// const onBtnExpense = ()=>{
//     navigate(`/user/dashboard/records/expense`, { replace: true })
// }

// const onBtnIncome = ()=>{
//     navigate(`/user/dashboard/records/income`, { replace: true })
// }
const [colorTotal, setColorTotal] = useState({
    "color":"green",
  })

useEffect(() => {
 
    if(suma > 0){
        setColorTotal({
            "color":"green",
          })
    } else{
        setColorTotal({
            "color":"red",
          })
    }
}, [suma])
    return (
        <div className='mt-3 mb-3 text-center resume-card-div'>
            <div className='text-center fs-4'>Total balance </div>
            <div className='text-center total' style={colorTotal}>$ {suma} </div>

            {/* <div>
                <button
                onClick={onBtnIncome}
                >
                    Income Records

                </button>
                <button
                onClick={onBtnExpense}
                
                >
                    Expense Records

                </button>
            </div> */}

        </div>
    )
}

export default Resumecard