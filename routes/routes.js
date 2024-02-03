const express = require('express')
const router = express.Router()
var customerController = require('../controllers/customer-controller.js');
  
router.route("/customer")
    .get(customerController.getAllCustomers)
    .post(customerController.addCustomer)

router.route("/customer/:_id")
    .get(customerController.getCustomer)
    .put(customerController.updateCustomer)

router.route("/customer/login")
    .post(customerController.verifyLogin)

router.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = router

