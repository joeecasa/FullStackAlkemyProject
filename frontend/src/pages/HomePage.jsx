import React from 'react'
import { useCustomFetchRecords } from '../hooks/useCustomFetchRecords'


const HomePage = () => {
    const  {dataRecords,isloadingRecors}  = useCustomFetchRecords("http://localhost:3001/records/list")
  const { data } = !!dataRecords && dataRecords;

  

  console.log(data)


    // useEffect(() => {
    //     if (data) {
    //         data.forEach((element) => {
    //             return element
    //         })
    //     } 
    // }, [])

    return (
        <div>
            


        </div>
    )
}

export default HomePage