import { useState, useEffect } from "react";


export const useCustomFetchCategories = (url) => {

    const [state, setState] = useState({
        dataCategories: null,
        isLoadingCategories: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingCategories: true,
        });

        fetch(url, {
            
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
        })
            .then(res => res.json())
            .then(dataCategoriesApi => setState({
                dataCategories: dataCategoriesApi,
                isLoadingCategories: false,
            }))
            .catch(err => {
                setState({
                    dataCategories: null,
                    isLoadingCategories: false,
                })
            })

    }, [url])

    return {
        dataCategories: state.dataCategories,
        isLoadingCategories: state.isLoadingCategories,
    }


}