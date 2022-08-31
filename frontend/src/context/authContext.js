import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import customFetchLogin from '../hooks/customFetchLogin';
import PropTypes from "prop-types"
import Swal from 'sweetalert2'

const userIsLogged = "userIsLogged"
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem(userIsLogged) ?? false);
    const [errorEmailLogin, seterrorEmailLogin] = useState("")

    const login = useCallback(function (email, password) {
        customFetchLogin("https://backendalkemy.herokuapp.com/user/login", [email, password])
            .then(
                (response) =>
                    response.json()
            )
            .then(data => {
                if (data.message !== undefined) {
                    console.log(data.message)
                    seterrorEmailLogin(data.message)

                } else {
                    seterrorEmailLogin("")
                    Swal.fire({
                        icon: 'success',
                        title: 'Welcome to finance App',
                        text: 'Enjoy it',
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Great!',

                    })

                    sessionStorage.setItem("user", JSON.stringify({
                        id: data.user.id,
                        email: data.user.email,

                    }))

                    sessionStorage.setItem(userIsLogged, true)
                    setIsAuthenticated(true)
                }


            })
    }, [])

    const logout = useCallback(function () {
        sessionStorage.removeItem(userIsLogged)
        setIsAuthenticated(false)
    }, [])

    const value = useMemo(
        () => ({
            login,
            logout,
            isAuthenticated,
            errorEmailLogin

        }), [login, logout, isAuthenticated, errorEmailLogin])



    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}
AuthContextProvider.prototypes = {
    children: PropTypes.object
}
export function useAuthContext() {
    return useContext(AuthContext)
}