import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import customFetchDeleteRecord from '../hooks/customFetchDeleteRecord'




const RecordsDelete = () => {
    const id = useParams().id
    const navigate = useNavigate()

    const onDeleteClick = ()=>{
        customFetchDeleteRecord(`http://localhost:3001/records/delete/${id}`)
    navigate(`/user/dashboard/`, { replace: true })

    }
    const onBackBtn = ()=>{
    navigate(`/user/dashboard/`, { replace: true })


    }

    return (
        <div>
            <div>
                Are you sure?
            </div>
            <button 
            onClick={onDeleteClick}
            >
                Delete
            </button>
            <button
            onClick={onBackBtn}
            >
                back to dashboard
            </button>
        </div>
    )
}

export default RecordsDelete