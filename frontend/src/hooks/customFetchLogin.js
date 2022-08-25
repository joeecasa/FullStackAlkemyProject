const customFetchLogin = async (url, options) => {
    const [localEmail, localPassword] = options;

    const userData = await fetch(url, {
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
    });
    return userData



}

export default customFetchLogin