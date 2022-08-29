import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import customFetchLogin from '../hooks/customFetchLogin';
import PropTypes from "prop-types"
import { validateEmail } from '../helpers/validateEmail';

const userIsLogged = "userIsLogged"
export const AuthContext = createContext();

export function AuthContextProvider ({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem(userIsLogged) ?? false);

    const login = useCallback(function(email,password){
        if (!validateEmail(email)) return;
        if (password.trim().length < 6) return;
        customFetchLogin("http://localhost:3001/user/login", [email, password])
            .then(
                (response) =>
                    response.json()
            )
            .then(data => {
                if (data.message !== undefined) {
                    console.log(data.message)
                    // sessionStorage.setItem("errors",JSON.stringify({
                    //     errors : data.message
                    // }
                    // ))

                } else {
                    sessionStorage.removeItem("errors")
                    sessionStorage.setItem("user", JSON.stringify({
                        id: data.user.id,
                        email: data.user.email,
                        
                    }))
                    sessionStorage.setItem(userIsLogged, true)
                    setIsAuthenticated(true)

                    // navigate("/dashboard", { replace: true })
                    // window.location.reload()
                }


            })
    },[])

    const logout = useCallback(function(){
        sessionStorage.removeItem(userIsLogged)
        setIsAuthenticated(false)
    },[])

    const value = useMemo(
        ()=>({
        login,
        logout,
        isAuthenticated

    }),[login,logout,isAuthenticated])



    return <AuthContext.Provider value = {value} >{children}</AuthContext.Provider>
}
AuthContextProvider.prototypes = {
    children : PropTypes.object
}
export function useAuthContext(){
    return useContext(AuthContext)
}