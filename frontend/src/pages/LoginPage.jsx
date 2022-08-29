import React from 'react'
import { useState } from 'react'
import { useAuthContext } from "../context/authContext"








const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuthContext();


    const [formErrors, setFormErrors] = useState({email:"",password:""})







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
    }


    // const inputEmail = document.getElementById("emailLogin")
    // window.addEventListener("DOMContentLoaded", function (event) {

    //     console.log(inputEmail)

    //     inputEmail.addEventListener("keydown", function () {
    //         if (!validateEmail(email)) {
    //             setErrors(["Email invalido"])
    //         }

    //     })
    //     console.log(errors)


    // })


    return (
        <>
            <h2>Login page</h2>
           
            <form
                onSubmit={onFormSubmit}

            >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailLogin"

                        onChange={onInputChange}
                        value={email}
                        name="email"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
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

                <button
                    className="btn btn-outline-primary"
                    onClick={onFormSubmit}

                >Login</button>
            </form>
        </>
    )
}

export default LoginPage