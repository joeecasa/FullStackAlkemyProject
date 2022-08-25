const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");





const recordsController = {
    list: function (req, res) {
        console.log("ola")
        db.Record.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "users" },
    
                ]
        }
        )
            .then(records => {
                let response = {
                    data: records
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
                    created_at: Date.now(),
                    amount: req.body.amount,
                    category_id: req.body.category_id,

                }
            )
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        data: confirm
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
                user_id : req.body.user_id
            },
            {
                where: { id: recordId }
            })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        data: confirm
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


}

module.exports = recordsController
