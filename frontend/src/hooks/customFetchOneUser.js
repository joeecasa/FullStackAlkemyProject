import { useState, useEffect } from "react";



export const CustomFetchOneUser = (url) => {
    // const [localEmail] = options;
    // console.log(localEmail)

    const [state, setState] = useState({
        userdata: null,
    });

    useEffect(() => {


        fetch(url, {

            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
            // body: JSON.stringify({
            //     email: localEmail,
            // })
        })
            .then(res => res.json())
            .then(dataUserApi => {
                
                setState({
                    userdata: dataUserApi,
                })
            }
            )
            .catch(err => {
                setState({
                    userdata: null,
                })
            })

        }, [url])
        
    return {
        dataRecords: state.userdata,
    }


}


