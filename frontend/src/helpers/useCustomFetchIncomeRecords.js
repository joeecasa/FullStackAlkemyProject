import { useState, useEffect } from "react";


export const useCustomFetchIncomeRecords = (url) => {

    const [state, setState] = useState({
        dataIncomeRecords: null,
        isLoadingIncomeRecords: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingIncomeRecords: true,
        });

        fetch(url, {
            
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
        })
            .then(res => res.json())
            .then(dataIncomeRecordsApi => setState({
                dataIncomeRecords: dataIncomeRecordsApi,
                isLoadingIncomeRecords: false,
            }))
            .catch(err => {
                setState({
                    dataIncomeRecords: null,
                    isLoadingIncomeRecords: false,
                })
            })

    }, [url])

    return {
        dataIncomeRecords: state.dataIncomeRecords,
        isLoadingIncomeRecords: state.isLoadingIncomeRecords,
    }


}