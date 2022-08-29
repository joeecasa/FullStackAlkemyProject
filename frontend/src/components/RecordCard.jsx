import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./componentsStyles.css"


const RecordCard = ({ concept, amount, id,category,tipe,created }) => {
    const navigate = useNavigate();



const onBtnDeleteClick = ()=>{
    navigate(`/user/dashboard/records/delete/${id}`, { replace: true })
}
const onBtnUpdateClick = ()=>{
    navigate(`/user/dashboard/records/update/${id}`, { replace: true })

}


    return (
        <div className='card-record'>
                <div>
                    {concept}
                </div>
                
                <div>
                    {category}
                </div>
                
                <div>
                    {amount}
                </div>
                
                <div>
                    {tipe}
                </div>
                <div>
                    {created}
                </div>
               
                    <button
                    onClick={onBtnDeleteClick}
                    >
                        D
                    </button>
                    <button
                    onClick={onBtnUpdateClick}
                    >
                        U
                    </button>
                

        </div>
    )
}

export default RecordCard