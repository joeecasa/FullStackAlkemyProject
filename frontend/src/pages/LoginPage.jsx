import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../helpers/validateEmail'
import customFetchLogin from '../hooks/customFetchLogin'
import {useAuthContext} from "../context/authContext"







const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const { isAuthenticated,login,logout } = useAuthContext();



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
        login(email,password)

        // if (!validateEmail(email)) return;
        // if (password.trim().length < 6) return;
        // customFetchLogin("http://localhost:3001/user/login", [email, password])
        //     .then(
        //         (response) =>
        //             response.json()
        //     )
        //     .then(data => {
        //         if (data.message !== undefined) {
        //             setErrors(data.message)

        //         } else {
        //             setErrors([])
        //             sessionStorage.setItem("user", JSON.stringify({
        //                 id: data.user.id,
        //                 email: data.user.email
        //             }))
                    
                    
                    
        //             navigate("/dashboard", { replace: true })
        //             window.location.reload()
        //         }


        //     })
    }





    return (
        <>

            <h2>Login page</h2>
            {
                errors.length > 0 ?
                    (

                        <div>
                            {errors}
                        </div>
                    ) :
                    (
                        <>
                        </>
                    )
            }
            <form
                onSubmit={onFormSubmit}

            >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"

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