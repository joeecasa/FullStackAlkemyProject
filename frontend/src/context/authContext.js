import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import customFetchLogin from '../hooks/customFetchLogin';
import PropTypes from "prop-types"
import Swal from 'sweetalert2'

const userIsLogged = "userIsLogged"
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem(userIsLogged) ?? false);


    const login = useCallback(function (email, password) {
            customFetchLogin("http://localhost:3001/user/login", [email, password])
            .then(
                (response) =>
                    response.json()
            )
            .then(data => {
                if (data.status === 401) {
                    Swal.fire({
                        title: `${data.message}`,
                        icon: 'error',
                        confirmButtonText: 'Please,try again.'
                    })

                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Welcome to finance App',
                        text: 'Enjoy it',
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Great!',
                        confirmButtonColor: '#0d6efd',

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

        }), [login, logout, isAuthenticated])



    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

AuthContextProvider.prototypes = {
    children: PropTypes.object
}

export function useAuthContext() {
    return useContext(AuthContext)
}