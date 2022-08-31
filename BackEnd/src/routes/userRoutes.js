const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")





router.post("/add",userController.add)

router.post('/login', userController.login);

router.get("/oneUser",userController.findByEmail)

module.exports = router;
