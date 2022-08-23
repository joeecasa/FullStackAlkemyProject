import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../helpers/validateEmail'
import customFetchLogin from '../hooks/customFetchLogin'






const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);




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
        if (!validateEmail(email)) return;
        if (password.trim().length < 6) return;
        console.log(`Email:${email} Password: ${password}`)
        customFetchLogin("http://localhost:3001/user/login", [email, password])
            .then(
                (response) =>
                    response.json()
            )
            .then(data => {
                console.log("data",data)
                if (data.message !== undefined) {
                    setErrors(data.message)
                    
                } else {
                    setErrors([])

                    navigate("/", { replace: true })
                }
                
                
            })
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