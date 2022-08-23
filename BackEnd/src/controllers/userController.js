const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const bcryptjs = require('bcryptjs');





const userController = {

    // agregar un nuevo
    add: (req, res,) => {
        console.log(req.body)
        // console.log(bcryptjs.hashSync(req.body.password, 10),)
        db.User.create(
            {
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10)
            }
        )
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,

                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))

    },
    login: (req, res) => {

        console.log(req.body)
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(user => {
                if (user) {
                    let match = bcryptjs.compareSync(req.body.password, user.password);
                    if (match) {
                        res.status(200).json({ user });
                    } else {
                        res.status(401).send({
                            message: 'Password Incorrecto'
                        });
                    }
                } else {
                    res.status(404).send({
                        message: 'No existe el user'
                    });
                }
            })




    }





}
module.exports = userController