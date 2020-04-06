const db = require('../controllers/database');

exports.product_create = function (request, response, db) {
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        response.send('Produit créé avec succés')
    })
};