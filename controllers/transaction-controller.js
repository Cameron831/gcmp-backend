Transaction = require('../models/transaction-model')
var ObjectID = require('mongodb').ObjectID

exports.getAllTransactions = async function (req, res) {
    try {
        const transactions = await Transaction.find({})
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while getting all transactions: ' + error})
    }
}

exports.addTransaction = async (req, res) => {
    var newTransaction = new Transaction(req.body)
    try {
        const savedTransaction = await newTransaction.save()
         res.status(201).json(savedTransaction)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the transaction: ' + error})
    }
}