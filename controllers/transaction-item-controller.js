TransactionItem = require('../models/transaction-item-model')
var ObjectID = require('mongodb').ObjectID

exports.addTransactionItem = async (req, res) => {
    var newTransactionItem = new TransactionItem(req.body)
    try {
        const savedTransactionItem = await newTransactionItem.save()
         res.status(201).json(savedTransactionItem)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the transaction item: ' + error})
    }
}