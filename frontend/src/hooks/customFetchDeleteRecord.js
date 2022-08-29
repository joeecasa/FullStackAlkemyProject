const customFetchDeleteRecord = async (url) => {
    
 
     const recordData = await fetch(url, {
         method:"DELETE",
         headers:{
             "Content-Type":  "application/json",
             'Access-Control-Allow-Origin' :"*",
             
         },
         mode: "cors",
         
     });
     return recordData
 
 
 
 }
 
 export default customFetchDeleteRecord