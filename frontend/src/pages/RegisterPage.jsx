import React from 'react'
import UseCustomFetchRegister from '../hooks/useCustomFetchRegister'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



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
    const onFormSubmit = (event) => {
        event.preventDefault()
        UseCustomFetchRegister("http://localhost:3001/user/add", [email, password])
            .then(
                (response) =>
                    response.json()
            )
            .then(data => {
                console.log(data)

                navigate("/login", { replace: true })

            })


    }
    return (
        <>
            <h2>Register</h2>
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
                        name="userEmail"
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
                        name="userPassword"
                    />
                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={onFormSubmit}

                >Register</button>
            </form>
        </>
    )
}



export default RegisterPage