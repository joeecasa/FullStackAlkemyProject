import { useState, useEffect } from "react";


const CustomFetchLogin2 = (url,options) => {
    const [localEmail, localPassword] = options;

    const [state, setState] = useState({
        userData: null,
        isLoadingUser: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingUser: true,
        });

        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":  "application/json",
                'Access-Control-Allow-Origin' :"*",
                
            },
            mode: "cors",
            body: JSON.stringify({
                email: localEmail ,
                password: localPassword
            })
        })
            .then(res => res.json())
            .then(dataUserApi => setState({
                userData: dataUserApi,
                isLoadingUser: false,
            }))
            .catch(err => {
                setState({
                    userData: null,
                    isLoadingUser: false,
                })
            })

    }, [url])

    return {
        userData: state.userData,
        isLoadingUser: state.isLoadingUser,
    }


}

export default CustomFetchLogin2