const express = require('express');
const router = express.Router();
const recordsController = require("../controllers/recordsController")

router.get('/list/:id', recordsController.listByUser)

router.get('/expense/:id', recordsController.listExpenseByUser)

router.get('/income/:id', recordsController.listIncomeByUser)


router.get('/detail/:id', recordsController.detail)

router.get('/categories', recordsController.categories)

router.post('/create', recordsController.create)

router.put('/update/:id', recordsController.update)

router.delete('/delete/:id', recordsController.destroy);


module.exports = router;