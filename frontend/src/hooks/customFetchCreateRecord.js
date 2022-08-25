const useCustomFetchCreateRecord = async (url, options) => {
   const [concept, amount,category,tipe,userId] = options
   

    const recordData = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":  "application/json",
            'Access-Control-Allow-Origin' :"*",
            
        },
        mode: "cors",
        body: JSON.stringify({
            concept: concept ,
            amount: amount,
            category_id: category,
            tipe : tipe,
            user_id : userId
        })
    });
    return recordData



}

export default useCustomFetchCreateRecord