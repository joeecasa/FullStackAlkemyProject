import { useState, useEffect } from "react";


export const useCustomFetchExpenseRecords = (url) => {

    const [state, setState] = useState({
        dataExpenseRecords: null,
        isLoadingExpenseRecords: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingExpenseRecords: true,
        });

        fetch(url, {
            
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
        })
            .then(res => res.json())
            .then(dataExpenseRecordsApi => setState({
                dataExpenseRecords: dataExpenseRecordsApi,
                isLoadingExpenseRecords: false,
            }))
            .catch(err => {
                setState({
                    dataExpenseRecords: null,
                    isLoadingExpenseRecords: false,
                })
            })

    }, [url])

    return {
        dataExpenseRecords: state.dataExpenseRecords,
        isLoadingExpenseRecords: state.isLoadingExpenseRecords,
    }


}