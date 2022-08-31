const db = require('../../database/models');
const bcryptjs = require('bcryptjs');





const userController = {

    // agregar un nuevo
    add: (req, res,) => {
        let userInDb = db.User.findOne({
            where: { email: req.body.email }
        })
            .then((response) => {
                if (response) {
                    res.status(401).send({
                        message: 'This email is already being used'
                    });
                } else {
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
                }
            })
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
                            message: 'Invalid Credentials'
                        });
                    }
                } else {
                    res.status(404).send({
                        message: 'Invalid Credentials'
                    });
                }
            })




    },
    findByEmail: function(req,res){
        db.User.findOne({
            where:{email:req.body.email}
        })
        .then(response=>{
            res.json(response)
        })
    }





}
module.exports = userController