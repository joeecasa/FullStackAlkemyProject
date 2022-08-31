import React, { useEffect } from 'react'
import UseCustomFetchRegister from '../hooks/useCustomFetchRegister'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./pages.css"
import { validateEmail } from '../helpers/validateEmail'
import Swal from 'sweetalert2'

const RegisterPage = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "userEmail") {
            setEmail(value);
        }
        else if (name === "userPassword") {
            setPassword(value)

        }

    }
    const [errorEmail, setErrorEmail] = useState("")
    
    const onFormSubmit = (event) => {
        event.preventDefault()
        UseCustomFetchRegister("https://backendalkemy.herokuapp.com/user/add", [email, password])
        .then(
            (response) =>
                response.json()
        )
        .then(data => {
            if (data.message !== undefined) {

                setErrorEmail(data.message)
            
                if (!validateEmail(email)) {
                    document.querySelector(".errorEmail").classList.remove("none")
                    document.querySelector(".errorEmail").classList.add("show")
        
                } else {
                    document.querySelector(".errorEmail").classList.add("none")
                    document.querySelector(".errorEmail").classList.remove("show")
                }
                if (errorEmail != "") {
                    document.querySelector(".errorSession").classList.remove("none")
                    document.querySelector(".errorSession").classList.add("show")
                    document.querySelector(".errorSession").innerHTML = errorEmail
        
                } else {
                    document.querySelector(".errorSession").innerHTML = ""
                    
                }
                if(!password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')){
                    document.querySelector(".errorPass").classList.remove("none")
                    document.querySelector(".errorPass").classList.add("show")
                    
                } else {
                    document.querySelector(".errorPass").classList.add("none")
                    document.querySelector(".errorPass").classList.remove("show")
                }
    
            } else {
                Swal.fire({
                    title: "Success",
                    text: 'Please Login to enter to the app',
                    icon: 'success',
                    confirmButtonText: 'Login'
                  })
                navigate("/login", { replace: true })
            }
        
        
        

           


        })
        
        
        


    }
    return (
        <div className='form-login'>

            <h2 className='text-center'>Register</h2>


            <form
                onSubmit={onFormSubmit}
                className="p-5"
            >
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"

                        onChange={onInputChange}
                        value={email}
                        name="userEmail"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={onInputChange}
                        value={password}
                        name="userPassword"
                    />
                </div>
                <div className='div-form-input-label'>
                    <div id="emailHelp" className="form-text errorEmail errorText none">Please, write an valid Email</div>
                    <div id="emailHelp" className="form-text errorSession errorText none"></div>
                    <div id="emailHelp" className="form-text errorText errorPass none">The password must contain at least 1 number at least 1 lower case at least 1 upper case and minimun 8 characters.</div>
                    <button
                        className="btn btn-outline-dark text-center btn-login"
                        onClick={onFormSubmit}

                    >Register</button>
                </div>
            </form>
        </div>
    )
}



export default RegisterPage