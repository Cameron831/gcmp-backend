const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer-controller.js')
const teetimeController = require('../controllers/teetime-controller.js')
const paymentMethodController = require('../controllers/payment-method.controller.js')
const reservationController = require('../controllers/reservation-controller.js')
const transactionController = require('../controllers/transaction-controller.js')
const transactionItemController = require('../controllers/transaction-item-controller.js')
const itemController = require('../controllers/item-controller.js')
  
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

router.route("/teetimes")
.get(teetimeController.getTeetimesForSelectedDate);

router.route("/teetime/reserve/:_id")
.put(teetimeController.reserveTeeTime)

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

router.route("/payment-method/:_id")
.get(paymentMethodController.getPaymentMethod)
.delete(paymentMethodController.deletePaymentMethod)

router.route("/customer/payment-method/:customer_id")
.get(paymentMethodController.getCustomerPaymentMethods)

//                    //
// Transaction routes //
//                    //
router.route("/transaction")
.get(transactionController.getAllTransactions)
.post(transactionController.addTransaction)

//                         //
// Transaction Item routes //
//                         //
router.route("/transaction-item")
.post(transactionItemController.addTransactionItem)

//             //
// Item routes //
//             //
router.route("/item")
.get(itemController.getAllItems)
.post(itemController.addItem)

// Handle url not found
router.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = router

