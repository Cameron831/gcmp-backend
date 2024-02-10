const mongoose = require('mongoose')

const paymentMethodSchema= new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    card_number: {
    type: String,
    required: true
   },
   exp: {
    type: String,
    required: true
   }
})

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema, 'payment-method')