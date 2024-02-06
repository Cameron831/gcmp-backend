const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
                const emailRegex = /^\S+@\S+\.\S+$/
                return emailRegex.test(email)
            },
            message: 'Invalid email format'
        }
    }
})

customerSchema.pre('save', function(next) {
    if(this.isModified('password') || this.isNew) {
        try {
            const salt = bcrypt.genSaltSync(saltRounds)
            this.password = bcrypt.hashSync(this.password, salt)
            next()
        } catch (error) {
            return next(error)
        }
    } else {
        next()
    }
})



module.exports = mongoose.model('Customer', customerSchema, 'customers')