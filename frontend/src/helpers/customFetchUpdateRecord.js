const customFetchUpdateRecord = async (url, options) => {
    const [concept, amount, category, tipe, userId,date] = options


    const recordData = await fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",

        },
        mode: "cors",
        body: JSON.stringify({
            concept: concept,
            amount: tipe === "Expense" && amount > 0 ? amount*(-1) : amount,
            user_id: userId,
            category_id: category,
            tipe: tipe,
            date: date

        })
    });
    return recordData



}

export default customFetchUpdateRecord