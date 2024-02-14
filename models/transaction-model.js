const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    payment_id: {
        type: mongoose.Types.ObjectId,
        ref: "PaymentMethod",
        required: true
    },
    transaction_total: {
        type: Number,
        required: true
    },
    date_time: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema, 'transactions')