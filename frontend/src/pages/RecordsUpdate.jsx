import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCustomFetchCategories } from '../hooks/useCustomFetchCategories'
import { useNavigate, useParams } from 'react-router-dom'
import { useCustomFetchDetail } from '../hooks/UseCustomFetchDetail'
import customFetchUpdateRecord from '../helpers/customFetchUpdateRecord'
import Swal from 'sweetalert2'




const RecordsCreate = () => {
  const { dataCategories } = useCustomFetchCategories("http://localhost:3001/records/categories")
  const { categories } = !!dataCategories && dataCategories;


  const idParam = useParams().id
  const { dataDetail } = useCustomFetchDetail(`http://localhost:3001/records/detail/${idParam}`)
  const { data } = !!dataDetail && dataDetail
  const [conceptDetail, setConceptDetail] = useState("");
  const [amountDetail, setAmountDetail] = useState("");
  const [tipeDetail, setTipeDetail] = useState("");
  const [idCategoryDetail, setIdCategoryDetail] = useState("");
  const [dateDetail, setDateDetail] = useState("");

  useEffect(() => {
    if (data) {
      setConceptDetail(data.concept)
      setAmountDetail(data.amount)
      setTipeDetail(data.tipe)
      setIdCategoryDetail(data.category_id)
      setDateDetail(data.created_at)
    }

  }, [data])
  console.log(dateDetail)




  const userInSession = JSON.parse(sessionStorage.getItem("user"))

  const [userId, setUserId] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (userInSession) {
      setUserId(userInSession.id)
    }
  }, [userInSession])




  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [tipe, setTipe] = useState("");
  const [date, setDate] = useState("");



  useEffect(() => {
    if (concept === "") {
      setConcept(conceptDetail)
    }
    if (amount === "") {
      setAmount(amountDetail)
    }
    if (category === "") {
      setCategory(idCategoryDetail)
    }

    if (tipe === "") {
      setTipe(tipeDetail)
    }
    if (date === "") {
      setDate(dateDetail)
    }

  }, [data])


  console.log(date)

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

    }
    else if (name === "date") {
      setDate(value)

    }

  }

  const onFormSubmit = (event) => {
    event.preventDefault()


    customFetchUpdateRecord(`https://backendalkemy.herokuapp.com/records/update/${idParam}`, [concept, amount, category, tipe, userId, date])
      .then(
        (response) =>
          response.json()
      )
      .then(data => {
        Swal.fire({

          title: "Record Updated",
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
      <h1 className='text-center'>Update Record</h1>
      <form
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
            defaultValue={conceptDetail}

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
            defaultValue={amountDetail}
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
            defaultValue={dateDetail}

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
              {
                tipeDetail === "Income" ?
                  (<option disabled
                    selected={tipeDetail === "Income"}
                    value="Income">Income</option>)
                  :
                  (
                    <option disabled
                      selected={tipeDetail === "Expense"}
                      value="Expense">Expense</option>

                  )
              }
            </select>
            <div id="emailHelp" className="form-text">You cannot change the tipe</div>
          </div>
          <div className="mb-3">
          <div htmlFor="tipe" className='select-title'>Categories</div>
            
            <select
              className="select-form"
              name="categories"
              onChange={onInputChange}

            >
              <option disabled selected> Seleccionar</option>
              {
                categories ?
                  (
                    categories.map(categoria => {
                      return (
                        <option
                          key={categoria.id}
                          value={categoria.id}
                          selected={categoria.id === idCategoryDetail}


                        >{categoria.name}</option>

                      )

                    })
                  )
                  :
                  (
                    <div>cargando</div>

                  )
              }
            </select>
          </div>

        </div>

        <button
          type='submit'
          className='btn btn-outline-dark btn-form-create'
        >
          Update</button>

      </form>

    </div>
  )
}

export default RecordsCreate