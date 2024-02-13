const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer-controller.js')
const teetimeController = require('../controllers/teetime-controller.js')
const paymentMethodController = require('../controllers/payment-method.controller.js')
const reservationController = require('../controllers/reservation-controller.js')
  
//                 //
// Customer Routes //
//                 //
router.route("/customer")
.get(customerController.getAllCustomers)
.post(customerController.addCustomer)

router.route("/customer/:_id")
.get(customerController.getCustomer)
.put(customerController.updateCustomer)

router.route("/customer/login")
.post(customerController.verifyLogin)

//                 //
// Tee time routes //
//                 //
router.route("/teetime")
.get(teetimeController.getAllTeetimes)
.post(teetimeController.addTeetime)


//                    //
// Reservation Routes //
//                    //
router.route("/reservation")
.post(reservationController.addReservation)


//                       //
// Payment method routes //
//                       //
router.route("/payment-method")
.post(paymentMethodController.addPaymentMethod)

// Handle url not found
router.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = router

