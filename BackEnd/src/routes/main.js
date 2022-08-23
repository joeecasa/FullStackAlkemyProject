const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes")
const recordsRoutes = require("./recordsRoutes")


router.use("/user",userRoutes)

router.use("/records",recordsRoutes)


module.exports = router;
