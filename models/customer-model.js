const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^\S+@\S+\.\S+$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format'
        }
    }
});


module.exports = mongoose.model('Customer', customerSchema, 'customers');