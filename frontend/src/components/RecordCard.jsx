import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./componentsStyles.css"
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Swal from 'sweetalert2'
import customFetchDeleteRecord from '../hooks/customFetchDeleteRecord'
import { useState } from 'react';
import { useEffect } from 'react';



const RecordCard = ({ concept, amount, id, category, tipe, created }) => {
    
    
    
    const navigate = useNavigate();
    const onBtnDeleteClick = () => {
       
          Swal.fire({
            title: 'Are you sure you want delete this record?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            customFetchDeleteRecord(`https://backendalkemy.herokuapp.com/records/delete/${id}`)
              Swal.fire({
                  
                  title : "Delete",
                  icon: "error",
                  confirmButtonText:"Ok"
              })
              .then((result)=>{
                if(result.isConfirmed){
                    window.location.reload()

                }
              })
              
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const onBtnUpdateClick = () => {
        navigate(`/user/dashboard/records/update/${id}`, { replace: true })

    }
    

const [colorAmount, setColorAmount] = useState({
    "color":"green",
  })
useEffect(() => {
 
    if(amount>0){
        setColorAmount({
            "color":"green",
          })
    } else{
        setColorAmount({
            "color":"red",
          })
    }
}, [amount])

    return (
        <div className='card-record'>
            <div>

                <div className='text-center'>
                    {created}
                </div>
                <div className='text-center'>
                    {concept}
                </div>
            </div>
            <div className='d-flex justify-content-evenly align-items-center'>
                <div>
                    {category}
                </div>
                <div>
                    {tipe}
                </div>
            </div>
                <div className='text-center amount' style={colorAmount}>
                  $  {amount}
                </div>

            <div className='text-center'>
                <button
                    className='btn-delete-card'
                    onClick={onBtnDeleteClick}
                >
                    <MdDeleteForever
                        className='icon-delete-card'
                    />
                </button>
                <button
                    onClick={onBtnUpdateClick}
                    className="btn-update-card"
                >
                    <HiOutlinePencilAlt />
                </button>
            </div>


        </div>
    )
}

export default RecordCard