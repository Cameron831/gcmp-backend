const mongoose = require('mongoose')

const transactionItemSchema = new mongoose.Schema({
    transaction_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    item_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("TransactionItem", transactionItemSchema, "transaction-items")