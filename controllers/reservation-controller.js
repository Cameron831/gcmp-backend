Reservation = require('../models/reservation-model')
var ObjectID = require('mongodb').ObjectID

exports.addReservation = async (req, res) => {
    var newReservation = new Reservation(req.body)
    try {
        const savedReservation = await newReservation.save()
         res.status(201).json(savedReservation)
    } catch (error) {
        res.status(500).send({message: 'An error occurred while adding the reservation: ' + error})
    }
}

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ customer_id: req.params._id })
                .populate('teetime_id')
                .exec();

        console.log(reservations)
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this customer.' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error("Failed to retrieve reservations:", error)
        res.status(500).send({ message: 'An error retrieving reservations: ' + error.message });
    }
};