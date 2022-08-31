import { useState, useEffect } from "react";

const customFetchOneUser = async (url, options) => {
    const [localEmail] = options;
    
    const userData = await fetch(url, {
        method:"get",
        headers:{
            "Content-Type":  "application/json",
            'Access-Control-Allow-Origin' :"*",
            
        },
        body: JSON.stringify({
            email: localEmail ,
        })
    });
    return userData



}
export default customFetchOneUser