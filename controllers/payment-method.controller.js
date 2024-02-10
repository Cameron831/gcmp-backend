PaymentMethod = require('../models/payment-method-model')
var ObjectID = require('mongodb').ObjectID

exports.addPaymentMethod = async function (req, res) {
    newPayment = new PaymentMethod(req.body)
    try {
        const savedPayment = await newPayment.save()
         res.status(201).json(savedPayment)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the payment method: ' + error})
    }
}