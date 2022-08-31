import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthContext } from "../context/authContext"
import "./pages.css"
import { validateEmail } from '../helpers/validateEmail'







const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const { login,errorEmailLogin } = useAuthContext();



    const onInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value)

        }
        

    }


    const onFormSubmit = (event) => {
        event.preventDefault()
        login(email, password)
        if (!validateEmail(email)) {
            document.querySelector(".errorEmail").classList.remove("none")
            document.querySelector(".errorEmail").classList.add("show")

        } else {
            document.querySelector(".errorEmail").classList.add("none")
            document.querySelector(".errorEmail").classList.remove("show")
        }
        
        if ( errorEmailLogin ) {
            document.querySelector(".errorSession").classList.remove("none")
            document.querySelector(".errorSession").classList.add("show")
        } else {
            document.querySelector(".errorSession").classList.add("none")
            document.querySelector(".errorSession").classList.remove("show")
        }
        if(password === ""){
            document.querySelector(".emptypass").classList.remove("none")
            document.querySelector(".emptypass").classList.add("show")
        }else{
            document.querySelector(".emptypass").classList.add("none")
            document.querySelector(".emptypass").classList.remove("show")
        }
        
    }




    return (
        <div className='form-login'>
            <h2 className='text-center'>Login</h2>

            <form
                onSubmit={onFormSubmit}
                className="p-5"
            >
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control email-input"
                        id="emailLogin"

                        onChange={onInputChange}
                        value={email}


                        name="email"
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
                        name="password"
                    />
                </div>
                <div className='div-form-input-label'>
                    <div id="emailHelp" className="form-text errorSession errorText none">Invalid Credentials</div>
                    <div id="emailHelp" className="form-text errorEmail errorText none">Please, write an valid Email</div>
                    <div id="emailHelp" className="form-text emptypass errorText none">Please, write a password</div>


                    <button
                        className="btn btn-outline-dark text-center btn-login"
                        onClick={onFormSubmit}

                    >Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage