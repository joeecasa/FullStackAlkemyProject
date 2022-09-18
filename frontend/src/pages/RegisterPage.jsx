import React from 'react'
import UseCustomFetchRegister from '../hooks/useCustomFetchRegister'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./pages.css"
import Swal from 'sweetalert2'

const RegisterPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState({ field: "", valid: null });
    const [password, setPassword] = useState({ field: "", valid: null });

    const onInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "userEmail") {
            setEmail({ ...email, field: value });
        }
        else if (name === "userPassword") {
            setPassword({ ...password, field: value })

        }

    }
    const expresiones = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8}/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }


    const validacionEmail = () => {
        if (expresiones.email.test(email.field)) {
            setEmail({ ...email, valid: "true" })
            document.querySelector(".errorEmail").classList.add("none")
            document.querySelector(".errorEmail").classList.remove("show")
            document.querySelector("#inputEmail").classList.remove("border-red")


        } else {
            setEmail({ ...email, valid: "false" })
            document.querySelector(".errorEmail").classList.remove("none")
            document.querySelector(".errorEmail").classList.add("show")
            document.querySelector("#inputEmail").classList.add("border-red")


        }

    }
    const validationPassword2 = () => {
        if (password.field === "") {
            setPassword({ ...password, valid: "false" })
        } else {
            setPassword({ ...password, valid: "true" })
        }
    }


    const validacionPassword = () => {
        if (expresiones.password.test(password.field)) {
            setPassword({ ...password, valid: "true" })
            document.querySelector(".errorPass").classList.add("none")
            document.querySelector(".errorPass").classList.remove("show")
            document.querySelector("#inputPass").classList.remove("border-red")


        } else {
            setPassword({ ...password, valid: "false" })
            document.querySelector(".errorPass").classList.remove("none")
            document.querySelector(".errorPass").classList.add("show")
            document.querySelector("#inputPass").classList.add("border-red")


        }
    }


    const onFormSubmit = (event) => {
        event.preventDefault()
        if (email.valid === "true" && password.valid === "true") {
            UseCustomFetchRegister("http://localhost:3001/user/add", [email.field, password.field])
                .then(
                    (response) =>
                        response.json()
                )
                .then(data => {
                    if (data.status === 401) {
                        Swal.fire({
                            title: `${data.message}`,
                            icon: 'error',
                            confirmButtonText: 'Please,try again.',
                            confirmButtonColor: '#0d6efd',

                        })
                    } else {

                        Swal.fire({
                            title: "Success",
                            text: 'Please Login to enter to the app',
                            icon: 'success',
                            confirmButtonText: 'Login',
                            confirmButtonColor: '#0d6efd',

                        })
                        navigate("/login", { replace: true })
                    }
                }
                    // }
                )
        } else {
            if (expresiones.email.test(email.field)) {
                setEmail({ ...email, valid: "true" })
                document.querySelector(".errorEmail").classList.add("none")
                document.querySelector(".errorEmail").classList.remove("show")
                document.querySelector("#inputEmail").classList.remove("border-red")

            } else {
                setEmail({ ...email, valid: "false" })
                document.querySelector(".errorEmail").classList.remove("none")
                document.querySelector(".errorEmail").classList.add("show")
                document.querySelector("#inputEmail").classList.add("border-red")


            }
            if (expresiones.password.test(password.field)) {
                setPassword({ ...password, valid: "true" })
                document.querySelector(".errorPass").classList.add("none")
                document.querySelector(".errorPass").classList.remove("show")
                document.querySelector("#inputPass").classList.remove("border-red")


            } else {
                setPassword({ ...password, valid: "false" })
                document.querySelector(".errorPass").classList.remove("none")
                document.querySelector(".errorPass").classList.add("show")
                document.querySelector("#inputPass").classList.add("border-red")


            }

        }
    }

    return (
        <div className='form-login div-home'>

            <h1 className='text-center'>Register</h1>


            <form
                onSubmit={onFormSubmit}
                className="p-5"
            >
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        onChange={onInputChange}
                        value={email.field}
                        name="userEmail"
                        onBlur={validacionEmail}
                    />
                    <div id="emailHelp" className="form-text errorEmail errorText none">Please, write an valid Email</div>
                </div>
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPass"
                        onChange={onInputChange}
                        value={password.field}
                        onKeyDown={validationPassword2}
                        name="userPassword"
                        onBlur={validacionPassword}


                    />
                </div>
                <div className='div-form-input-label'>
                    <div id="emailHelp" className="form-text errorSession errorText none"></div>
                    <div id="emailHelp" className="form-text errorText errorPass none">The password must contain
                        <ul>
                            <li>
                                One number
                            </li>
                            <li>
                                One lower case
                            </li>
                            <li>
                                One upper case
                            </li>
                            <li>
                                8 characters minimum
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-dark text-center btn-login"
                        onClick={onFormSubmit}

                    >Register</button>
                </div>
            </form>
        </div>
    )
}



export default RegisterPage