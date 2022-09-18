import React from 'react'
import { useState } from 'react'
import { useAuthContext } from "../context/authContext"
import "./pages.css"







const LoginPage = () => {
    const [email, setEmail] = useState({ field: "", valid: null });
    const [password, setPassword] = useState({ field: "", valid: null });
    const { login } = useAuthContext();


    const onInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "userEmail") {
            setEmail({ ...email, field: value });
        }
        else if (name === "userPassword") {
            setPassword({ ...email, field: value })

        }

    }


    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const validationEmail = () => {
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

    const validationPassword = () => {
        if (password.field === "") {
            setPassword({ ...password, valid: "false" })
            document.querySelector(".emptypass").classList.remove("none")
            document.querySelector(".emptypass").classList.add("show")
            document.querySelector("#inputPass").classList.add("border-red")


        } else {
            setPassword({ ...password, valid: "true" })
            document.querySelector(".emptypass").classList.add("none")
            document.querySelector(".emptypass").classList.remove("show")
            document.querySelector("#inputPass").classList.remove("border-red")

        }
    }
    const validationPassword2 = () => {
        if (password.field === "") {
            setPassword({ ...password, valid: "false" })
        } else {
            setPassword({ ...password, valid: "true" })
        }
    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        if (email.valid === "true" && password.valid === "true") {
            login(email.field, password.field)


        } else {
            validationEmail()
            validationPassword()

        }




    }

 


    return (
        <div className='form-login div-home'>
            <h1 className='text-center'>Login</h1>

            <form
                onSubmit={onFormSubmit}
                className="p-5"
            >
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control email-input"
                        name="userEmail"
                        onChange={onInputChange}
                        onBlur={validationEmail}
                        id="inputEmail"
                        value={email.field}


                    />
                    <div id="emailHelp" className="form-text errorEmail errorText none">Please, write your Email</div>


                </div>
                <div className="mb-3 div-form-input-label">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password
                    </label>
                    <div className='container-input-eye'>

                        <input
                            type="password"
                            className="form-control input-pass"
                            name="userPassword"
                            onChange={onInputChange}
                            onBlur={validationPassword}
                            onKeyDown={validationPassword2}
                            value={password.field}
                            id="inputPass"


                        />
                        
                    </div>
                    <div id="emailHelp" className="form-text emptypass errorText none">Please, write your password</div>

                </div>
                <div className='div-form-input-label'>
                    <button
                        className="btn btn-secondary text-center btn-login"
                        onClick={onFormSubmit}

                    >Login </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage