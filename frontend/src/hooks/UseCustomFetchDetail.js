import { useState, useEffect } from "react";


export const useCustomFetchDetail = (url) => {

    const [state, setState] = useState({
        dataDetail: null,
        isLoadingDetail: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingDetail: true,
        });

        fetch(url, {
            
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
        })
            .then(res => res.json())
            .then(dataDetailApi => setState({
                dataDetail: dataDetailApi,
                isLoadingDetail: false,
            }))
            .catch(err => {
                setState({
                    dataDetail: null,
                    isLoadingDetail: false,
                })
            })

    }, [url])

    return {
        dataDetail: state.dataDetail,
        isLoadingDetail: state.isLoadingDetail,
    }


}