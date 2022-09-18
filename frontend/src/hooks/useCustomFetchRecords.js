import { useState, useEffect} from "react";



export const useCustomFetchRecords = (url) => {

    const [state, setState] = useState({
        dataRecords: null,
        isLoadingRecords: true,
    });

    useEffect(() => {
        setState({
            ...state,
            isLoadingRecords: true,
        });

        fetch(url, {
            
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",

            },
            mode: "cors",
        })
            .then(res => res.json())
            .then(dataRecordsApi => setState({
                dataRecords: dataRecordsApi,
                isLoadingRecords: false,
            }))
            .catch(err => {
                setState({
                    dataRecords: null,
                    isLoadingRecords: false,
                })
            })

    }, [url])

    return {
        dataRecords: state.dataRecords,
        isLoadingRecords: state.isLoadingRecords,
    }


}


