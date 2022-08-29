import React, { useEffect } from 'react'
import { useState } from 'react'
import RecordCard from '../components/RecordCard'
import { useCustomFetchIncomeRecords } from '../helpers/useCustomFetchIncomeRecords'


const RecordsIncome = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const userId = user.id
    const { dataIncomeRecords } = useCustomFetchIncomeRecords(`http://localhost:3001/records/income/${userId}`)
    const { data } = !!dataIncomeRecords && dataIncomeRecords;
    const [records, setRecords] = useState()


    useEffect(() => {
        if (data) {
            setRecords(data)
        }
    }, [data])

    return (
        <div>
            {
                records && records.length > 0 ?
                    (
                        <ul>
                            {
                                records.map(record => {
                                    return (
                                        <RecordCard
                                            key={record.id}
                                            amount={record.amount}
                                            concept={record.concept}
                                            id={record.id}
                                            tipe={record.tipe}
                                            category={record.categories.name}
                                            created={record.created_at}
                                        />
                                    )
                                })
                            }
                        </ul>

                    )
                    :
                    (
                        <div>
                            No existen registros de este usuario
                        </div>
                    )
            }
        </div>
    )
}

export default RecordsIncome