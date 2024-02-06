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
    }
})

module.exports = mongoose.model('Teetime', teetimeSchema, 'teetimes')