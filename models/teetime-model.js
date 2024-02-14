const mongoose = require('mongoose')

const teetimeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    carts: {
        type: Boolean,
        required: true
    },
    numberOfPlayers: {
        type: Number,
        required: true
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Teetime', teetimeSchema, 'teetimes')