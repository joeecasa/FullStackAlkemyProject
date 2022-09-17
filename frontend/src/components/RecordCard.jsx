import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./componentsStyles.css"
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Swal from 'sweetalert2'
import customFetchDeleteRecord from '../hooks/customFetchDeleteRecord'
import { useState } from 'react';
import { useEffect } from 'react';



const RecordCard = ({ concept, amount, id, category, tipe, created, }) => {



    const navigate = useNavigate();



    const onBtnDeleteClick = () => {


        // con el swal
        Swal.fire({
            title: 'Are you sure you want delete this record?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: 'black',


        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // customFetchDeleteRecord(`https://backendalkemy.herokuapp.com/records/delete/${id}`)
                customFetchDeleteRecord(`http://localhost:3001/records/delete/${id}`)
                Swal.fire({

                    title: "Delete",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: '#0d6efd',

                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()

                        }
                    })

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })


    }
    const onBtnUpdateClick = () => {
        navigate(`/user/dashboard/records/update/${id}`)

    }


    const [colorAmount, setColorAmount] = useState({
        "color": "green",
    })
    const [cardColor, setCardColor] = useState({
        "color": "white",
    })
    useEffect(() => {

        // if (amount > 0) {
        //     setColorAmount({
        //         "color": "#198754",
        //     })
        // } else {
        //     setColorAmount({
        //         "color": "#dc3545",
        //     })
        // }
        if (amount > 0) {
            setCardColor({
                "backgroundColor": "#d1e7dd",
                "color": "#055160",
            })
        } else {
            setCardColor({
                "backgroundColor": "#f8d7da",
                "color": "#842029",
            })
        }
    }, [amount])
  



    return (
        <div className='card-record' style={cardColor}>

            {/* <div className='container-1'> */}


            <div className='text-center card-div date-div'>
                {created}
            </div>
            <div className='text-center card-div concept-div'>
                {concept}
                {/* </div> */}
            </div>
            <div className='container-2'>

                <div className=' category-div'>
                    {category}
                </div>
                <div className=' tipe-div'>
                    {tipe}
                </div>
            </div>
            <div className='text-center amount card-div amount-div'>
                $  {amount}
            </div>

            <div className='text-center btn-div'>
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