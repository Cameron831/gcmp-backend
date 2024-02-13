Reservation = require('../models/reservation-model')
var ObjectID = require('mongodb').ObjectID

exports.addReservation = async (req, res) => {
    var newReservation = new Reservation(req.body)
    try {
        const savedReservation = await newReservation.save()
         res.status(201).json(savedReservation)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the customer: ' + error})
    }
}