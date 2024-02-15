PaymentMethod = require('../models/payment-method-model')
var ObjectID = require('mongodb').ObjectID

exports.addPaymentMethod = async function (req, res) {
    const newPayment = new PaymentMethod(req.body)
    try {
        const savedPayment = await newPayment.save()
        res.status(201).json(savedPayment)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the payment method: ' + error.message})
    }
}

exports.getCustomerPaymentMethods = async function (req, res) {
    try {
        const paymentMethods = await PaymentMethod.find({customer_id: req.params.customer_id})
        res.status(200).json(paymentMethods)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while retrieving payment methods: ' + error.message})
    }
}

exports.getPaymentMethod = async function (req, res) {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params._id)
        res.status(200).json(paymentMethod)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while retrieving payment method: ' + error.message})
    }
}

exports.deletePaymentMethod = async function (req, res) {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params._id)
        res.status(200).json(deletedPaymentMethod)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while deleting payment method: ' + error.message})
    }
}