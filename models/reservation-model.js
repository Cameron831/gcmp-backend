const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    teetime_id: {
        type: mongoose.Types.ObjectId,
        ref: "Teetime",
        required: true
    }
})

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations')