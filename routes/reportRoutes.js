const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

// create a new product
router.post('/', reportController.create);

// retrieve all products
router.get('/', reportController.findAll);

router.get('/days/:day', reportController.findbyDay);

// retrieve a single product by id
router.get('/:id', reportController.findOne);


// update a product by id
router.put('/:id', reportController.update);

// delete a product by id
router.delete('/:id', reportController.delete);


module.exports = router;
