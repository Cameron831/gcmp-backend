const mongoose = require('mongoose')

const billingAddressSchema= new mongoose.Schema({
    user_id: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }, 
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BillingAddress', billingAddressSchema, 'billingAddress')