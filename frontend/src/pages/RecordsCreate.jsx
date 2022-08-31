import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import customFetchCreateRecord from '../hooks/customFetchCreateRecord'
import { useCustomFetchCategories } from '../hooks/useCustomFetchCategories'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const RecordsCreate = () => {
  const { dataCategories } = useCustomFetchCategories("http://localhost:3001/records/categories")
  const { categories } = !!dataCategories && dataCategories;

  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [tipe, setTipe] = useState("");
  const [date, setDate] = useState("");
  const userInSession = JSON.parse(sessionStorage.getItem("user"))

  const [userId, setUserId] = useState("")
  const navigate = useNavigate();




  useEffect(() => {
    if (userInSession) {
      setUserId(userInSession.id)
    }
  }, [userInSession])






  const onInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "concept") {
      setConcept(value);
    }
    else if (name === "amount") {
      setAmount(value)

    } else if (name === "categories") {
      setCategory(value)

    } else if (name === "tipe") {
      setTipe(value)

    } else if (name === "date") {
      setDate(value)

    }
    console.log(value)
  }



  const onFormSubmit = (event) => {
    event.preventDefault()
    // console.log(tipe)
    // if(tipe === "Expense"){
    //   setAmount(amount *-1)
    // }
    // console.log(amount)

    customFetchCreateRecord("https://backendalkemy.herokuapp.com/records/create", [concept, amount, category, tipe, userId, date])
      .then(
        (response) =>
          response.json()
      )
      .then(data => {
        Swal.fire({

          title: "Record Created",
          icon: "success",
          confirmButtonText: "Ok"
        })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/user/dashboard", { replace: true })

            }
          })
      })
  }




  return (
    <div>
      <h1 className='text-center'>New Record</h1>

      <form action=""
        className='p-5 form-create'
        onSubmit={onFormSubmit}

      >
        <div className="mb-3">
          <label className='form-label' htmlFor="concept">Concept*</label>
          <input
            name='concept'
            className='form-control'
            type="text"
            onChange={onInputChange}
          />
          <div id="emailHelp" className="form-text">Write the concept. Min 2 characters  </div>
        </div>
        <div className="mb-3">
          <label className='form-label' htmlFor="amount">Amount*</label>
          <input
            name="amount"
            className='form-control'
            type="number"
            onChange={onInputChange}
          />
          <div id="emailHelp" className="form-text">Write the Amount, min 1 max $1.000.000</div>
        </div>
        <div className="mb-3">
          <label className='form-label' htmlFor="date">Date*</label>
          <input
            name="date"
            className='form-control'
            type="date"
            onChange={onInputChange}
          />
        </div>
        <div className='container-select '>
          <div className="mb-3">
            <div htmlFor="tipe" className='select-title'>Tipe</div>
            <select
              name="tipe"
              onChange={onInputChange}
              className="select-form"
            >
              <option disabled selected>Seleccionar</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="mb-3">
            <div htmlFor="tipe" className='select-title'>Categories</div>

            <select

              name="categories"
              onChange={onInputChange}
              className="select-form"

            >
              <option disabled selected> Seleccionar</option>
              {
                categories ?
                  (
                    categories.map(categoria => {
                      return (
                        <option key={categoria.id} value={categoria.id}>{categoria.name}</option>

                      )

                    })
                  )
                  :
                  (
                    <option></option>

                  )




              }
            </select>
          </div>


        </div>

        <button
          type='submit'
          className='btn btn-outline-dark btn-form-create'
        > Create</button>







      </form>

    </div>
  )
}

export default RecordsCreate