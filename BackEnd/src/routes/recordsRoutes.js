const express = require('express');
const router = express.Router();
const recordsController = require("../controllers/recordsController")

/* GET home page. */
router.get('/list', recordsController.list)
router.get('/categories', recordsController.categories)

router.post('/create', recordsController.create)

router.put('/update/:id', recordsController.update)


module.exports = router;