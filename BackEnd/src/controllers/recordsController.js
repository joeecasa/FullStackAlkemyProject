const db = require('../../database/models');





const recordsController = {
    listByUser: function (req, res) {
        db.Record.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "users" },
                ],
                where: {
                    user_id: req.params.id
                },
                order : [["created_at", "DESC"]]
            }
        )
            .then((records) => {
                let response = {
                    data: records,
                    status:200

                }
                res.json(response)

            })
            .catch(error => res.send(error))
    },
    listExpenseByUser : function (req, res) {
        db.Record.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "users" },
                ],
                where: {
                    user_id: req.params.id,
                    tipe : "Expense"
                },
                order : [["created_at", "DESC"]]

            }
        )
            .then((records) => {
                let response = {
                    data: records,
                    status:200

                }
                res.json(response)

            })
            .catch(error => res.send(error))
    },
    listIncomeByUser : function (req, res) {
        db.Record.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "users" },
                ],
                where: {
                    user_id: req.params.id,
                    tipe : "Income"
                },
                order : [["created_at", "DESC"]]
                
                

            }
        )
            .then((records) => {
                let response = {
                    data: records,
                    status:200

                }
                res.json(response)

            })
            .catch(error => res.send(error))
    },
    create: (req, res) => {
        db.Record.
            create(
                {
                    concept: req.body.concept,
                    tipe: req.body.tipe,
                    created_at: req.body.date,
                    amount: req.body.amount,
                    category_id: req.body.category_id,
                    user_id : req.body.user_id

                }
            )
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        data: confirm,
                        status: 200
                    }
                }
                res.json(respuesta)
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        let recordId = req.params.id;
        db.Record.update(
            {
                concept: req.body.concept,
                tipe: req.body.tipe,
                updated_at: Date.now(),
                amount: req.body.amount,
                category_id: req.body.category_id,
                user_id: req.body.user_id,
                created_at : req.body.date
            },
            {
                where: { id: recordId }
            })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        data: confirm,
                        status:200
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))

    },
    categories: function (req, res) {
        db.Category.findAll(
            {
                include: [
                    { association: "records" },
                ]
            }
        )
            .then(categories => {
                let response = {
                    categories: categories
                }
                res.json(response)
            })
            .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let recordId = req.params.id;
        db.Record
        .destroy({where: {id: recordId}}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                    },
                   
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    detail: (req, res) => {
        db.Record.findByPk(req.params.id,
            {
                include: [
                    { association: "categories" },
                    { association: "users" },
                ],
                where: {
                    user_id: req.params.id
                }
            })
            .then(record => {
                let respuesta = {
                    meta: {
                        status: 200,
                    },
                    data: record
                }
                res.json(respuesta);
            });
    }

    


}

module.exports = recordsController
