import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCustomFetchCategories } from '../hooks/useCustomFetchCategories'
import { useNavigate, useParams } from 'react-router-dom'
import { useCustomFetchDetail } from '../hooks/UseCustomFetchDetail'
import customFetchUpdateRecord from '../helpers/customFetchUpdateRecord'
import Swal from 'sweetalert2'





const RecordsUpdate = () => {
  const { dataCategories } = useCustomFetchCategories("https://backendalkemy.herokuapp.com/records/categories")
  // const { dataCategories } = useCustomFetchCategories("http://localhost:3001/records/categories")
  const { categories } = !!dataCategories && dataCategories;


  const idParam = useParams().id
  const { dataDetail } = useCustomFetchDetail(`https://backendalkemy.herokuapp.com/records/detail/${idParam}`)
  // const { dataDetail } = useCustomFetchDetail(`http://localhost:3001/records/detail/${idParam}`)
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



  const userInSession = JSON.parse(sessionStorage.getItem("user"))

  const [userId, setUserId] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (userInSession) {
      setUserId(userInSession.id)
    }
  }, [userInSession])




  const [concept, setConcept] = useState({ field: "", valid: null });
  const [amount, setAmount] = useState({ field: "", valid: null });
  const [category, setCategory] = useState({ field: "", valid: null });
  const [tipe, setTipe] = useState({ field: "", valid: null });
  const [date, setDate] = useState({ field: "", valid: null });



  useEffect(() => {
    if (concept.field === "") {
      setConcept({ field: conceptDetail, valid: "true" })
    }
    if (amount.field === "") {
      setAmount({ field: amountDetail, valid: "true" })
    }
    if (category.field === "") {
      setCategory({ field: idCategoryDetail, valid: "true" })
    }

    if (tipe.field === "") {
      setTipe({ field: tipeDetail, valid: "true" })
    }
    if (date.field === "") {
      setDate({ field: dateDetail, valid: "true" })
    }

  }, [data])



  const onInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "concept") {
      setConcept({ ...concept, field: value });
    }
    else if (name === "amount") {
      setAmount({ ...amount, field: value })

    } else if (name === "categories") {
      setCategory({ ...category, field: value })

    } else if (name === "tipe") {
      setTipe({ ...tipe, field: value })

    } else if (name === "date") {
      setDate({ ...date, field: value })

    }
  }
  
  const expresiones = {
    concept: /^.{2,1000}$/, // 4 a 12 digitos.
  }
  const validationConcept = () => {

    if (expresiones.concept.test(concept.field)) {
      setConcept({ ...concept, valid: "true" })
      document.querySelector("#conceptHelp").classList.remove("show")
      document.querySelector("#conceptHelp").classList.add("none")
      document.querySelector("#inputConcept").classList.remove("border-red")

    } else {
      setConcept({ ...concept, valid: "false" })
      document.querySelector("#conceptHelp").classList.add("show")
      document.querySelector("#conceptHelp").classList.remove("none")
      document.querySelector("#inputConcept").classList.add("border-red")
    }
  }
  const validationAmount = () => {

    if (amount.field === "" || (amount.field > 1000000)) {
      setAmount({ ...amount, valid: "false" })
      document.querySelector("#amountHelp").classList.add("show")
      document.querySelector("#amountHelp").classList.remove("none")
      document.querySelector("#inputAmount").classList.add("border-red")

    } else {
      setAmount({ ...amount, valid: "true" })
      document.querySelector("#amountHelp").classList.remove("show")
      document.querySelector("#amountHelp").classList.add("none")
      document.querySelector("#inputAmount").classList.remove("border-red")
    }
  }
  const validationDate = () => {

    if (date.field === "") {
      setDate({ ...date, valid: "false" })
      document.querySelector("#dateHelp").classList.add("show")
      document.querySelector("#dateHelp").classList.remove("none")
      document.querySelector("#inputDate").classList.add("border-red")
    } else {
      setDate({ ...date, valid: "true" })
      document.querySelector("#dateHelp").classList.remove("show")
      document.querySelector("#dateHelp").classList.add("none")
      document.querySelector("#inputDate").classList.remove("border-red")
    }

  }
  const validationTipe = () => {
    if (tipe.field === "") {
      setTipe({ ...tipe, valid: "false" })
      document.querySelector("#tipeHelp").classList.add("show")
      document.querySelector("#tipeHelp").classList.remove("none")
      document.querySelector("#inputTipe").classList.add("border-red")
    } else {
      setTipe({ ...tipe, valid: "true" })
      document.querySelector("#tipeHelp").classList.remove("show")
      document.querySelector("#tipeHelp").classList.add("none")
      document.querySelector("#inputTipe").classList.remove("border-red")
    }

  }
  const validationCategories = () => {
    if (category.field === "") {
      setCategory({ ...category, valid: "false" })
      document.querySelector("#categoriesHelp").classList.add("show")
      document.querySelector("#categoriesHelp").classList.remove("none")
      document.querySelector("#inputCategory").classList.add("border-red")
    } else {
      setCategory({ ...category, valid: "true" })
      document.querySelector("#categoriesHelp").classList.remove("show")
      document.querySelector("#categoriesHelp").classList.add("none")
      document.querySelector("#inputCategory").classList.remove("border-red")
    }

  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (concept.valid === "true" && amount.valid === "true" && date.valid === "true" && tipe.valid === "true" && category.valid === "true") {



      customFetchUpdateRecord(`https://backendalkemy.herokuapp.com/records/update/${idParam}`, [concept.field, amount.field, category.field, tipe.field, userId, date.field])
        // customFetchUpdateRecord(`http://localhost:3001/records/update/${idParam}`, [concept, amount, category, tipe, userId, date])
        .then(
          (response) =>
            response.json()
        )
        .then(data => {
          Swal.fire({

            title: "Record Updated",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: '#0d6efd',

          })
            .then((result) => {
              if (result.isConfirmed) {
                navigate(-1)

              }
            })



        })
    } else {
      validationAmount()
      validationConcept()
      validationDate()
      validationTipe()
      validationCategories()
    }
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
            value={concept.field}
            defaultValue={conceptDetail}
            id="inputConcept"
            onBlur={validationConcept}

          />
          <div id="conceptHelp" className="form-text errorText none">Write the concept. Min 2 characters  </div>

        </div>
        <div className="mb-3">
          <label className='form-label' htmlFor="amount">Amount*</label>
          <input
            name="amount"
            className='form-control'
            type="number"
            onChange={onInputChange}
            defaultValue={amountDetail}
            value={amount.field}

            id="inputAmount"
            onBlur={validationAmount}
          />
          <div id="amountHelp" className="form-text errorText none">Write the Amount, max $1.000.000</div>
        </div>
        <div className="mb-3">
          <label className='form-label' htmlFor="date">Date*</label>
          <input
            name="date"
            className='form-control'
            type="date"
            onChange={onInputChange}
            defaultValue={dateDetail}
            value={date.field}
            id="inputDate"
            onBlur={validationDate}

          />
        </div>
        <div id="dateHelp" className="form-text errorText none">Please write or select a date</div>
        <div className='container-select '>
          <div className="mb-3">
            <div htmlFor="tipe" className='select-title'>Tipe</div>
            <select
              name="tipe"
              onChange={onInputChange}
              className="select-form"
              onBlur={validationTipe}
              id='inputTipe'
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
              id='inputCategory'
              onBlur={validationCategories}

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
        <div id="tipeHelp" className="form-text errorText none">Please select a tipe</div>
        <div id="categoriesHelp" className="form-text errorText none">Please select a category</div>

        <button
          type='submit'
          className='btn btn-outline-dark btn-form-create'
        >
          Update</button>

      </form>

    </div>
  )
}

export default RecordsUpdate