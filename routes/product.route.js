const express = require('express');
const router = express.Router();

// Require the Controllers which we did not create yet
const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test);

router.post('/create', product_controller.product_create);

module.exports = router;